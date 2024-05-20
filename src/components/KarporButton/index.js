import React, { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import styles from "./style.module.css";

function KarporButton({ url, btnText }) {
    return (
        <div className={styles.karbour_button}>
            <a href={url} target="__blank">
                {btnText}
                <AiOutlineArrowRight
                    style={{ fontWeight: "bold", marginLeft: 5 }}
                />
            </a>
        </div>
    );
}

export default KarporButton;
