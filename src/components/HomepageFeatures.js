import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'KCL配置语言',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
      面向配置、校验场景，基于声明式、OOP 编程范式等理念设计，静态类型语言。
      </>
    ),
  },
  {
    title: 'Kusion模型库',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
      Kusion Model 是 KusionStack 中预置的、使用 KCL 描述的配置模型，它提供给用户开箱即用、高度抽象的配置界面
      </>
    ),
  },
  {
    title: 'KusionStack引擎',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        引擎介于 KCL 与底层基础设施之间，用于解释 KCL 的编译结果，并对底层各种异构基础设置进行操作，屏蔽基础设施复杂性。为同一份配置在不同环境提供可编排、可观察、可运维的一致体验。
      </>
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
