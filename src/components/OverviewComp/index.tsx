import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import kusionImg from "../../../static/img/kusionstack-icon.png";
import cncfImg from "../../../static/img/cncf-color.png";
import antgroupPng from "../../../static/img/logos/antgroup.jpeg";
import GithubStars from "../GithubStars";
import styles from "./style.module.css";

const FeatureBlock = ({
  imgSrc = cncfImg,
  hasFeatureTitle = false,
  title = "",
  reverse = false,
  customStyle = {},
}) => {
  return (
    <div
      className={styles.feature_block}
      style={{
        ...customStyle,
        flexDirection: reverse ? "row-reverse" : "row",
      }}
    >
      <div className={styles.feature_desc}>
        {hasFeatureTitle && <div className={styles.feature_title}>{title}</div>}
        <div className={styles.desc}>
          But the modern day for most software organizations this promise
          quickly become unrelalistic since the increasingly complex
          cloud-native toolchains, while cloud native technologies made huge
          improvements in areas such as scalability, availability and
          operability, it also brings downside - the growing burden on
          developers, which leads to the rise of [Platform
          Engineering](https://platformengineering.org/).
        </div>
      </div>
      <div className={styles.feature_image}>
        <img src={imgSrc} />
      </div>
    </div>
  );
};

const Highlight = ({}) => {
  return (
    <>
      <div className={styles.top_content}>
        <div className={styles.title}>Cross-Cluster Discovery 🔍</div>
        <div className={styles.title}>Limitless Insights 📊. With AI. ✨</div>
        <div className={styles.desc}>
          A Multi-Cluster Kubernetes Data Plane focusing on Search, Insight and
          Intelligence
        </div>
        <div className={styles.action}>
          <div className={styles.demo}>
            <a href="https://karpor-demo.kusionstack.io" target="__blank">
              Demo
              <AiOutlineArrowRight
                style={{ fontWeight: "bold", marginLeft: 5 }}
              />
            </a>
          </div>
          <div className={styles.github_info}>
            <GithubStars repo={"KusionStack/karpor"} />
          </div>
        </div>
        <div className={styles.img_box}>
          <img src={kusionImg} />
        </div>
      </div>
      <div className={styles.content}>
        <FeatureBlock
          imgSrc={kusionImg}
          hasFeatureTitle={true}
          title={"what is Karpor?"}
          customStyle={{ borderBottom: "1px solid #f1f1f1" }}
        />
        <div className={styles.content_item}>
          <div className={styles.content_title}>Highlights</div>
          <FeatureBlock reverse={true} imgSrc={cncfImg} />
          <FeatureBlock reverse={false} imgSrc={antgroupPng} />
          <FeatureBlock reverse={true} imgSrc={cncfImg} />
        </div>
      </div>
    </>
  );
};

export default Highlight;
