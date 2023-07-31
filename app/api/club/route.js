/*import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";*/
import { NextResponse, NextRequest } from 'next/server';
import db from '../../lib/db';
import { Club, Game } from '../../models/clubs';
import { transporter } from '../../lib/email';

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = process.env.TURNSTILE_SECRET_KEY;

export async function POST(request) {
  const formData = await request.formData();

  const { token } = formData;
  // before parsing the form data, validate the turnstile token
  const res = await fetch(verifyEndpoint, {
    method: 'POST',
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })

  const data = await res.json()
  if (!data.success) {
    return NextResponse.json(
      { error: "Invalid token", success: false },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  let filePath = null;
  let buffer;
  if (file) {
    buffer = Buffer.from(await file.arrayBuffer());
    /*
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
    }*/
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
    // create club in database
    await db();
    const club = await Club.create(clubData)

    // send email to admin account notifying us about the new club
    const mailOptions = {
      to: 'fgcfinder83@gmail.com',
      subject: 'Test',
      text: 'Test email'
    };

    if (buffer) {
      // add image to email as an attachment if one was provided
      mailOptions.attachments = [
        {filename: file.name, content: buffer}
      ]
    }

    await transporter.sendMail(mailOptions);

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
