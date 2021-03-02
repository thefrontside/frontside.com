const fetch = require('node-fetch');

const run = async () => {
  const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  const discord_api = 'https://discord.com/api/v8';
  const APPLICATION_ID = `816332746187866132`;
  const GUILD_ID = `700803887132704931`;

  const url = `${discord_api}/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`;

  // command type ref: https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype
  const contents = [
    {
      name: 'ping',
      description: 'Pong.',
    },
    {
      name: 'welcome',
      description: 'Welcomes a new user and provides helpful links.',
      options: [
        {
          name: 'user',
          description: 'The user to welcome.',
          type: 6,
          required: true,
        },
      ],
    },
  ];

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
  };

  for (let bodyContent of contents) {
    const json = JSON.stringify(bodyContent);

    const response = await fetch(url, {
      method: 'post',
      body: json,
      headers,
    });
    const data = await response.json();

    console.dir(data);
  }
};

run();
