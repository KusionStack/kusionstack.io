import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    title: translate({'id': 'homepage.feature.kcl', 'message': 'KCL 语言'}),
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate id="homepage.feature.kcl.description">
      面向配置和策略场景的基于约束的记录及函数语言
      </Translate>
    ),
  },
  {
    title: translate({'id': 'homepage.feature.konfig', 'message': 'Kusion 模型库'}),
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <Translate id="homepage.feature.konfig.description">
      Kusion Model 是 KusionStack 中预置的、使用 KCL 描述的配置模型，它提供给用户开箱即用、高度抽象的配置界面。
      </Translate>
    ),
  },
  {
    title: translate({'id': 'homepage.feature.kusion', 'message': 'Kusion 引擎'}),
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate id="homepage.feature.kusion.description">
        Kusion 引擎介于 Konfig 与底层基础设施之间，用于解释 Konfig 中描述的运维意图，并根据运维意图对异构运行时进行操作。它屏蔽了基础设施复杂性，为不同环境提供一致的运维体验。
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
