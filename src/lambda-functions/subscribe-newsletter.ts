import { Handler } from '@netlify/functions';
import axios from 'axios';

const senderKey = process.env.SENDER_API;
const url = 'https://api.sender.net/v2/subscribers';

const handler: Handler = async (event) => {
  const formData = JSON.parse(event.body);
  const email = formData.email;

  if (!formData || !email) {
    return { statusCode: 422 };
  }

  let headers = {
    'Authorization': `Bearer ${senderKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const data = {
    email,
    status: 'subscribed',
    groups: ['boVm9A']
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
    let statusCode = error.response.status;
    console.log(statusCode);
    return { statusCode };
  }
};

export { handler };
