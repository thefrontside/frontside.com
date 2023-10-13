import { Handler } from '@netlify/functions';
import axios from 'axios';

const mailerliteKey = process.env.MAILERLITE_API;
const endpoint = 'https://api.mailerlite.com/api/v2';
const groupId = '110434688';

const handler: Handler = async (event) => {
  const formData = JSON.parse(event.body);
  const email = formData.email;
  const url = `${endpoint}/groups/${groupId}/subscribers`;

  if (!formData || !email) {
    return { statusCode: 422 };
  }

  const headers = {
    'X-MailerLite-ApiKey': `${mailerliteKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const data = {
    email,
  };

  try {
    await axios({
      method: 'POST',
      url,
      headers,
      data,
      validateStatus: (status) => status < 401,
    });
    return { statusCode: 200 };
  }
  catch(error) {
    console.log(error.response);
    let statusCode = error.response.status;
    console.log(statusCode);
    return { statusCode };
  }
};

export { handler };
