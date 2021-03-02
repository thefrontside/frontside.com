const fetch = require('node-fetch');
const interactions = require('discord-interactions');

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const discord_api = 'https://discord.com/api/v8';
const DISCORD_BOT_PUBLIC_KEY = process.env.DISCORD_BOT_PUBLIC_KEY;
const GUILD_ID = `700803887132704931`;

const headers = {
  Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
};

exports.handler = async function(event, context) {
  const body = JSON.parse(event.body);
  try {
    const signature = event.headers['x-signature-ed25519'];
    const timestamp = event.headers['x-signature-timestamp'];
    const isValidRequest = interactions.verifyKey(
      event.body,
      signature,
      timestamp,
      DISCORD_BOT_PUBLIC_KEY
    );
    if (!isValidRequest) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Bad request signature' }),
      };
    }
  } catch (e) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Bad request signature' }),
    };
  }

  // return the ping (discord checking if service is active)
  if (body.type === 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 1,
      }),
    };
  }

  const frontsiderRole = '762722489587335208';
  if (body.data.name === 'welcome') {
    const welcomedUser = body.data.options[0].value;
    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 3,
        data: {
          tts: false,
          content: `Welcome <@${welcomedUser}>! You may find our docs at https://frontside.com/bigtest, and feel free to ping any <@&${frontsiderRole}> with questions. It would be lovely if you introduced yourself!`,
          embeds: [],
          allowed_mentions: { parse: ['users', 'roles'] },
        },
      }),
    };
  } else {
    // body.data.name === 'ping'
    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 4,
        data: {
          tts: false,
          content: `I believe \`pong\` is the response that you expect, <@${body.member.user.id}>.`,
          embeds: [],
          allowed_mentions: { parse: ['users'] },
        },
      }),
    };
  }
};
