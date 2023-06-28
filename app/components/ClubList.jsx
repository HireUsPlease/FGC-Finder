"use client";

import React from "react";
import { useMap } from "../lib/state";
import styles from "./ClubList.module.css";
import Image from "next/image";

const ClubList = () => {
  // gets the array of searchResults from the context and sets them as the list of clubs
  const { searchResults } = useMap();
  const clubs = searchResults;

  return (
    // the container for the club list
    <div className={styles.clubListContainer}>
      {/* the header */}
      <h2 className={styles.header}>Fighting Game Communities</h2>
      {/* the actual list */}
      <div className={styles.clubList}>
        {/* the map function for each item we get from the database */}
        {/* each one will eventually link to a page with the clubs information expanded using the slug,
        but for now, its just a list */}
        {clubs.length > 0 ? (
          clubs.map((club, index) => (
            <div className={styles.clubCard} key={index}>
              <div className={styles.clubInfo}>
                <h3 className={styles.clubName}>{club.name}</h3>
                {/* the list of games should most likely be added here */}
                <p className={styles.clubDescription}>{club.description}</p>
                <p>{club.locationName}</p>
                <p>{club.address}</p>
                <p>{club.website}</p>
              </div>
              <div className={styles.clubImage}>
                {/* this can not load images without using a loader before hand, which can be referenced in the docs for
                the Image component in Next.js 
                however, I don't think it will be necessary if we use images that are uploaded
                I will have to look into this when we have some uploaded images */}
                <Image
                  src={club.logo}
                  style={{ objectFit: "contain" }}
                  alt="club logo image"
                  width={60}
                  height={60}
                />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.clubCard}>
            <div className={styles.clubInfo}>
              <h3 className={styles.clubName}>
                It looks like there are no Fighting Game Communities near you!
              </h3>
              <p className={styles.clubDescription}>
                If you would like too add one, submit it on the home page!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubList;
