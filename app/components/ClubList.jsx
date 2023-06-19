import React from "react";
import styles from "./ClubList.module.css";
import Image from "next/image";

const ClubList = () => {
  // these are just hard coded temporary fillers so I can see how it looks
  // they will need to be filled with the information gathered from $near
  const clubs = [
    {
      name: "Friday Night Fights",
      description: "We beat each other up on Fridays",
      logo: "/AT_CD_04.png",
      games: [
        "street Fighter 6",
        "Super Smash Bros Melee",
        "Guilty Gear Strive",
      ],
      location: "Arcade 92",
      address: "305 E Virginia St Suite 103, McKinney, TX 75069",
      website: "https://www.arcade92.com/",
    },
    {
      name: "Friday Night Fights",
      description: "We beat each other up on Fridays",
      logo: "/test logo.png",
      games: [
        "street Fighter 6",
        "Super Smash Bros Melee",
        "Guilty Gear Strive",
      ],
      location: "Arcade 92",
      address: "305 E Virginia St Suite 103, McKinney, TX 75069",
      website: "https://www.arcade92.com/",
    },
    {
      name: "Friday Night Fights",
      description: "We beat each other up on Fridays",
      logo: "/test logo.png",
      games: [
        "street Fighter 6",
        "Super Smash Bros Melee",
        "Guilty Gear Strive",
      ],
      location: "Arcade 92",
      address: "305 E Virginia St Suite 103, McKinney, TX 75069",
      website: "https://www.arcade92.com/",
    },
    {
      name: "Friday Night Fights",
      description: "We beat each other up on Fridays",
      logo: "/test logo.png",
      games: [
        "street Fighter 6",
        "Super Smash Bros Melee",
        "Guilty Gear Strive",
      ],
      location: "Arcade 92",
      address: "305 E Virginia St Suite 103, McKinney, TX 75069",
      website: "https://www.arcade92.com/",
    },
  ];

  return (
    // the container for the club list
    <div className={styles.clubListContainer}>
      {/* the header */}
      <h2 className={styles.header}>Fighting Game Communities</h2>
      {/* the actual list */}
      <div className={styles.clubList}>
        {/* the map function for each item we get from the database */}
        {clubs.map((club, index) => (
          <div className={styles.clubCard} key={index}>
            <div className={styles.clubInfo}>
              <h3 className={styles.clubName}>{club.name}</h3>
              <p className={styles.clubDescription}>{club.description}</p>
              <p>{club.location}</p>
              <p>{club.address}</p>
              <p>{club.website}</p>
            </div>
            <div className={styles.clubImage}>
              <Image
                src={club.logo}
                style={{ objectFit: "contain" }}
                alt="club logo image"
                width={60}
                height={60}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubList;
