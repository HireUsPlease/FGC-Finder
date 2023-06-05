import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { NextResponse, NextRequest } from 'next/server';
import db from '../../lib/db';
import { Club, Game } from '../../models/clubs';

export async function POST(request) {
  const formData = await request.formData();
  console.log(formData);

  const file = formData.get("file");
  let filePath = null;
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${file.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
      filePath = `${relativeUploadDir}/${filename}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  const clubData = {
    name: formData.get('name'),
    description: formData.get('description'),
    city: formData.get('city'),
    state: formData.get('state'),
    address: formData.get('address'),
    locationName: formData.get('locationName'),
    website: formData.get('website'),
    games: formData.getAll('games[]'),
    contactEmail: formData.get('email'),
    visible: false,
    logo: filePath,
  }

  try {
    await db();
    const club = await Club.create(clubData)
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong.", success: false },
      { status: 500 }
    );
  }


}
