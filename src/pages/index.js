import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const siteConfig_title = translate({id: 'homepage.title', "message": "KusionStack"});
  const siteConfig_tagline = translate({id: 'homepage.tagline', "message": "一站式可编程配置技术栈"});

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig_title}</h1>
        <p className="hero__subtitle">{siteConfig_tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/user_docs/getting-started/usecase">
            <Translate>Quick Start - 15min ⏱️</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const siteConfig_title = translate({id: 'homepage.title', "message": "KusionStack"});
  const description = translate({"message":"Description will go into a meta tag in <head />"});

  return (
    <Layout
      title={`${siteConfig_title}`}
      description={description}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
