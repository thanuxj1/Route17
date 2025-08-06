// api/whatsapp.js
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Mock database (replace with your actual data source)
const busDatabase = {
  '17': ['8:30 AM', '12:15 PM', '5:45 PM'],
  '100': ['7:00 AM', '3:30 PM', '9:00 PM']
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { Body: userMessage, From: sender, Source } = req.body;
    
    // Extract bus number from message
    const busMatch = userMessage.match(/\b(bus|route)?\s*(\d+)\b/i);
    let response;

    if (busMatch) {
      const busNumber = busMatch[2];
      if (busDatabase[busNumber]) {
        response = `Bus ${busNumber} schedule:\n${busDatabase[busNumber].join('\n')}`;
      } else {
        response = `Sorry, no schedule found for Bus ${busNumber}`;
      }
    } else if (userMessage.toLowerCase().includes('contact')) {
      response = "Contact admin: admin@sliit.lk";
    } else {
      response = `How to use:\n• "Bus 17 time?"\n• "Route 100 schedule?"\n• "Contact"`;
    }

    // Send reply via WhatsApp
    await client.messages.create({
      body: response,
      from: 'whatsapp:+14155238886', // Your Twilio number
      to: sender
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}