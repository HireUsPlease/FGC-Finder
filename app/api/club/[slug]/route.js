import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { Club, Game } from '../../../models/clubs';

export async function GET(request, { params }) {
  console.log(params);
  await db();
  // const sf6 = await Game.create({ name: 'Street Fighter 6'});
  // const club = await Club.create({
  //   name: 'Anderson Brawlers',
  //   description: 'We gon\' mess you up',
  //   location: {
  //     type: 'Point',
  //     coordinates: [-85.67786971289617, 40.10439675105565]
  //   },
  //   website: 'https://google.com',
  //   games: [sf6],
  //   visible: true,
  // });
  const id = params.slug.split('_').slice(-1)[0];
  console.log(id);
  const club = await Club.findById(id);
  return NextResponse.json({ club });
}
