import { NextResponse } from 'next/server';
import db from '../../lib/db';
import { Club } from '../../models/clubs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');
  const distance = searchParams.get('distance');
  const games = searchParams.get('games')?.split(',');
  const distanceInMeters = Math.abs(Number(distance) * 1609.344);

  console.log(distanceInMeters, lat, lng);
  await db();
  let searchResults;
  try {
    searchResults = await Club.find(
      {
        location: {
         $near: {
          $maxDistance: distanceInMeters,
          $geometry: {
           type: "Point",
           coordinates: [lng, lat]
          }
         }
        }
       },
      "name description logo location address city state locationName website games visible"
    ).populate('games');
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'An error occurred'}, { status: 500 });
  }

  if (!searchResults) {
    return NextResponse.json({ searchResults: null }, { status: 404 });
  }

  // filter out non-visible clubs and clubs that do not include at least one of your games (if provided)
  const filteredResults = searchResults.filter((club) => {
    if (!club.visible) {
      return false;
    }

    if (games && games.length > 0) {
      const matchingGames = club.games.filter((game) => {
        return games.includes(game._id.toString())
      });

      if (matchingGames.length > 0) {
        return true;
      }

      return false;
    }

    return true;
  });

  return NextResponse.json({ searchResults: filteredResults });
}
