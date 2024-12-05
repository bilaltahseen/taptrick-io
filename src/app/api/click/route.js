import { country_codes } from '@/constants/country-codes';
import { Event } from '@/models/Event';
import mongoose from 'mongoose';

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URI);

  // Get the URL and page parameters
  const url = new URL(req.url);
  const clickedLink = atob(url.searchParams.get('url'));
  const page = url.searchParams.get('page');

  // Extract the IP address from the request headers (assuming it's passed by the client)
  const ipAddress = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  // Fetch location data from ipinfo.io
  let locationData = {};
  try {
    const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=${process.env.IPINFO_API_KEY}`);
    locationData = await response.json();
  } catch (error) {
    console.error('Error fetching location:', error);
  }

  // Create an event with the click data and location
  await Event.create({
    type: 'click',
    uri: clickedLink,
    page,
    location: country_codes[locationData.country] || locationData.region || locationData.city || 'Unknown',
  });

  return Response.json(true);
}
