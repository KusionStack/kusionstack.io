import React from "react";

import styles from "./style.module.css";

function KarporButton({ url, btnText }) {
  return (
    <div className={styles.karpor_button}>
      <a href={url} target="__blank">
        <span className={styles.text}>{btnText}</span>
        <span className={styles.icon}>🕹️</span>
      </a>
    </div>
  );
}

export default KarporButton;
