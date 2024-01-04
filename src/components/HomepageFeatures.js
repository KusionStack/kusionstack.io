import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    title: translate({'id': 'homepage.feature.kcl', 'message': 'KCL 语言'}),
    Svg: require('/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate id="homepage.feature.kcl.description">
      面向配置和策略场景的基于约束的记录及函数语言
      </Translate>
    ),
  },
  {
    title: translate({'id': 'homepage.feature.konfig', 'message': 'Konfig'}),
    Svg: require('/img/undraw_docusaurus_tree.svg').default,
    description: (
      <Translate id="homepage.feature.konfig.description">
      Konfig 是一个配置大库，存放了用户用 KCL 描述的运维意图。它提供给用户开箱即用的云原生应用配置模型，方便用户快速开始云原生应用发布之旅。
      </Translate>
    ),
  },
  {
    title: translate({'id': 'homepage.feature.kusion', 'message': 'Kusion 引擎'}),
    Svg: require('/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate id="homepage.feature.kusion.description">
        Kusion 引擎编译、实施 Konfig 中描述的运维意图，屏蔽基础设施复杂性，为多运行时、多云提供一致的运维体验。
      </Translate>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
