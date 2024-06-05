import React, { useState, useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";

import styles from "./GithubStars.module.css";

function GithubStars({ repo }) {
  const [stars, setStars] = useState("?");

  useEffect(() => {
    // Fetch the gitHub star number
    fetch(`https://api.github.com/repos/${repo}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count);
        }
      });
  }, [repo]);

  return (
    <div className={styles.karpor_star_button}>
      <a href={`https://github.com/${repo}`} target="_blank">
        <span className={styles.text}>
          <AiOutlineStar className={styles.icon} />
          Star
        </span>
      </a>
      <a href={`https://github.com/${repo}/stargazers`} target="_blank">
        <span className={styles.star}>{stars}</span>
      </a>
    </div>
  );
}

export default GithubStars;
