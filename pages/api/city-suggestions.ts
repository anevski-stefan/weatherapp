import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_KEY = process.env.API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (typeof query !== 'string' || query.length < 3) {
    return res.status(400).json({ error: 'Query must be a string with at least 3 characters' });
  }

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );

    const suggestions = response.data.map((item: any) => 
      `${item.name}, ${item.state ? item.state + ', ' : ''}${item.country}`
    );

    res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch city suggestions' });
  }
}