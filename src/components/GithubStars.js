import React, { useState, useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";

import styles from "./GithubStars.module.css";

function GithubStars({ repo }) {
    const [stars, setStars] = useState("?");

    useEffect(() => {
        // 获取 GitHub Star 数
        fetch(`https://api.github.com/repos/${repo}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.stargazers_count) {
                    setStars(data.stargazers_count);
                }
            });
    }, [repo]);

    return (
        <a
            href={`https://github.com/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.stars_container}
        >
            Star <AiOutlineStar style={{ marginLeft: 6, fontWeight: "bold" }} />
        </a>
    );
}

export default GithubStars;
