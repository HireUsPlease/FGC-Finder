import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { Club, Game } from '../../../models/clubs';

/**
 * Returns club details for the club specified in the url
 * /api/club/[slug].  Slug is a concatenation of the club name
 * that has been lowercased, spaces converted to _, and special characters removed concatenated
 * with the club's _id.
 *
 * @param {*} request
 * @param {*} param1
 * @returns
 */
export async function GET(request, { params }) {
  console.log(params);
  await db();
  // const sf6 = await Game.create({ name: 'Street Fighter 6'});
  const id = params.slug.split('_').slice(-1)[0];
  let club;
  try {
    club = await Club.findById(id, "name description logo location address city state locationName website games visible").populate('games');
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'An error occurred'}, { status: 500 });
  }

  if (!club || !club.visible) {
    return NextResponse.json({ club: null }, { status: 404 });
  }

  return NextResponse.json({ club });
}
