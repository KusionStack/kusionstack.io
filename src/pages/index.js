import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React from 'react'
import { ExampleScroller } from "../components/ExampleScroller"
import ThemedImage from '@theme/ThemedImage'

import whoIsUsing from '../data/whoIsUsing'
import styles from './index.module.css'


function Feature({ imgUrl, imgDarkUrl, title, description, reverse }) {
  return (
    <div className={clsx('row', styles.feature, reverse && styles.featureReverse)}>
      <div className="col col--6 text--center">
        <ThemedImage className={styles.featureImage}
          alt={title}
          sources={{
            light: useBaseUrl(imgUrl),
            dark: useBaseUrl(imgDarkUrl)
          }}
        />
      </div>
      <div className={clsx('col col--6', styles.featureContent)}>
        <div>
          <h3>{title}</h3>
          <div>{description}</div>
        </div>
      </div>
    </div>
  )
}

function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title={ siteConfig.tagline} description={siteConfig.tagline}>
      <main>
        <div className={clsx('hero shadow--lw', styles.heroBanner)}>
          <div className="container text--center">
            <div className={styles.center}>
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">
                  <Translate id="siteConfig.tagline">{siteConfig.tagline}</Translate>
                </p>
            </div>
            <div className={styles.indexCtas}>
                <div>
                    <Link className={clsx("button button--lg button--secondary", styles.button)} to="/docs/user_docs/getting-started/usecases/deliver-first-project">
                        <Translate description="homepage getting started button">
                            Getting started
                        </Translate>
                    </Link>
                </div>
                <div>
                    <Link className={clsx("button button--primary button--lg", styles.button)} to="/docs/user_docs/getting-started/install">
                        <Translate description="homepage getting started button">
                            Install
                        </Translate>
                    </Link>
                </div>
            </div>
          </div>
        </div>

        <div className="hero-divider" />

        <div className="hero">
          <div className="container text--center">
            <h2 className="hero__subtitle">
              <Translate id="home.quickstart">All about your modern app by Platform as Code</Translate>
            </h2>
            <p className={styles.header}>
                <Translate id="siteConfig.tagline">KusionStack codifies and unifies platform resources into stacked models and policies.</Translate>
            </p>
          </div>
        </div>

        <div className="hero-divider" />

        <div className="hero">
          <div className="container">
            <Feature
              imgUrl="/img/features/easy.png"
              imgDarkUrl="/img/features/easy-white.png"
              title={<Translate id="home.easyshipping">Easy App Shipping</Translate>}
              description={
                <>
                  <p>
                    <Translate
                      id="home.easyshipping.1">
                      Fast development, easy delivery
                    </Translate>
                  </p>
                  <ul className='left-align-ul'>
                    <li>
                        <Translate id="home.easyshipping.2">
                            Codify and unify spec, resources and manifests around modern apps
                        </Translate>
                    </li>
                    <li>
                        <Translate id="home.easyshipping.3">
                            Orchestration and provision on Kubernetes and Clouds in a managed manner
                        </Translate>
                    </li>
                    <li>
                      <Translate id="home.easyshipping.4">
                            Easy-to-access, Kubernetes-first, lightweight and dev-friendly
                      </Translate>
                    </li>
                  </ul>
                </>
              }
            />
            <Feature
              imgUrl="/img/features/teams.png"
              imgDarkUrl="/img/features/teams-white.png"
              title={<Translate id="home.enterpriseops">Enterprise Declarative DevOps</Translate>}
              description={
                <>
                  <p>
                    <Translate
                      id="home.enterpriseops.1">
                      From the first code to production
                    </Translate>
                  </p>
                  <ul className='left-align-ul'>
                    <li>
                        <Translate id="home.enterpriseops.2">
                            Multi teams, projects go across multi phases to multi runtimes, clouds
                        </Translate>
                    </li>
                    <li>
                        <Translate id="home.enterpriseops.3">
                            Production-ready with scalability, performance and left-shifted stability
                        </Translate>
                    </li>
                    <li>
                      <Translate id="home.enterpriseops.4">
                            Various usages to meet the requirements of diverse enterprise scenarios
                      </Translate>
                    </li>
                  </ul>
                </>
              }
              reverse={true}
            />
            <Feature
              imgUrl="/img/features/enable.png"
              imgDarkUrl="/img/features/enable-white.png"
              title={<Translate id="home.platformengineering">Enable Platform Engineering</Translate>}
              description={
                <>
                  <p>
                    <Translate
                      id="home.platformengineering.1">
                      Build proper abstraction and golden path
                    </Translate>
                  </p>
                  <ul className='left-align-ul'>
                    <li>
                        <Translate id="home.platformengineering.2">
                            Schema-centric abstraction and constraints to build your models and validations
                        </Translate>
                    </li>
                    <li>
                      <Translate id="home.platformengineering.3">
                            Easy to integrate into CI pipeline, service and product to build your paved road
                      </Translate>
                    </li>
                    <li>
                      <Translate id="home.platformengineering.4">
                            Fast development on raw platform capabilities with consistency to cope with change
                      </Translate>
                    </li>
                  </ul>
                </>
              }
            />
          </div>
        </div>

        <div className="hero-divider" />

        <div className="hero">
            <ExampleScroller />
        </div>

        <div className="hero-divider" />

        <div className="hero">
          <div className="container text--center">
            <h2 className="hero__subtitle">
              <Translate id="home.whoisusing">Adopted by</Translate>
            </h2>
            <div className={styles.whiteboard}>
              <div className="row">
                {whoIsUsing.map((w) => (
                  <div key={w.name} className={clsx('col col--4', styles.whiteboardCol)}>
                    <a className={styles.logoWrapper} href={w.href} target="_blank">
                      <img style={w.style} src={useBaseUrl(w.img)} alt={w.name} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-divider" />

        <div className="hero">
          <div className="container text--center">
            <h2 className="hero__subtitle">
              KusionStack is in <Link to="https://cncf.io/">Cloud Native Computing Foundation</Link> landscape
            </h2>
            <br/>
            <div>
              <ThemedImage
                className={styles.cncfLogo}
                alt="CNCF themed image"
                sources={{
                  light: useBaseUrl('/img/cncf-color.png'),
                  dark: useBaseUrl('/img/cncf-white.png'),
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home