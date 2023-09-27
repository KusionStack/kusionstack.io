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
import { FcInTransit, FcDeployment, FcApproval } from "react-icons/fc";

function Feature({ icon, title, description, reverse }) {
  return (
    <div className={clsx('row', styles.feature, reverse && styles.featureReverse)}>
      <div className="col col--6 text--center">
        {icon}
      </div>
      <div className={clsx('col col--6')}>
        <div>
          <h3 className={styles.featureTitle} style={{ color: "var(--ifm-color-primary)" }}>{title}</h3>
          <div>{description}</div>
        </div>
      </div>
    </div>
  )
}

function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title={siteConfig.tagline} description={siteConfig.tagline}>
      <main>
        <header className={clsx("container", styles.banner)}>
          <div className="container">
            <h2 className={styles.title} style={{ color: "var(--ifm-color-primary)" }}>{siteConfig.title}</h2>
            <p className={styles.description}>
              <Translate id="siteConfig.tagline">{siteConfig.tagline}</Translate>
            </p>
            <div className={styles.indexCtas}>
              <div>
                <Link className={clsx("button button--lg button--secondary", styles.button)} to="/docs/user_docs/getting-started/deliver-the-wordpress-application-on-kubernetes">
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
        </header>

        <br></br>
        <br></br>

        <div className="container">
          <div className="container text--center">
            <h2 className={styles.subtitle} style={{ color: "var(--ifm-color-primary)" }}>
              <Translate id="home.quickstart">All about your modern app by Platform Engineering</Translate>
            </h2>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="container">
          <div className="container">
            <Feature
              icon={<FcInTransit size={224} />}
              title={<Translate id="home.easyshipping">Easy App Shipping</Translate>}
              description={
                <>
                  <p>
                    <Translate
                      id="home.easyshipping.1">
                      Faster development, simplified delivery
                    </Translate>
                  </p>
                  <ul className='left-align-ul'>
                    <li>
                      <Translate id="home.easyshipping.2">
                        Declarative, application-centric spec
                      </Translate>
                    </li>
                    <li>
                      <Translate id="home.easyshipping.3">
                        Managed resource orchestration and provisioning in Kubernetes and Clouds
                      </Translate>
                    </li>
                    <li>
                      <Translate id="home.easyshipping.4">
                        Kubernetes-first, lightweight and dev-friendly
                      </Translate>
                    </li>
                  </ul>
                </>
              }
            />
            <Feature
              icon={<FcApproval size={224} />}
              title={<Translate id="home.enterpriseops">Secure By Design</Translate>}
              description={
                <>
                  <p>
                    <Translate
                      id="home.enterpriseops.1">
                      From the first line of code to the production
                    </Translate>
                  </p>
                  <ul className='left-align-ul'>
                    <li>
                      <Translate id="home.enterpriseops.2">
                        Shift-left validation to detect risks early
                      </Translate>
                    </li>
                    <li>
                      <Translate id="home.enterpriseops.3">
                        Codified rules and policies from operating best practice
                      </Translate>
                    </li>
                    <li>
                      <Translate id="home.enterpriseops.4">
                        Enterprise-grade fine-grained cluster control for Kubernetes
                      </Translate>
                    </li>
                  </ul>
                </>
              }
              reverse={true}
            />
            <Feature
              icon={<FcDeployment size={224} />}
              title={<Translate id="home.platformengineering">Enable Developer Self-Service</Translate>}
              description={
                <>
                  <p>
                    <Translate
                      id="home.platformengineering.1">
                      Build universal abstraction and golden path
                    </Translate>
                  </p>
                  <ul className='left-align-ul'>
                    <li>
                      <Translate id="home.platformengineering.2">
                        Schema-based abstraction to build your models and validations
                      </Translate>
                    </li>
                    <li>
                      <Translate id="home.platformengineering.3">
                        Building blocks to establish your paved path
                      </Translate>
                    </li>
                    <li>
                      <Translate id="home.platformengineering.4">
                        Integration with iterative platform capabilities to meet evolving needs
                      </Translate>
                    </li>
                  </ul>
                </>
              }
            />
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="container">
          <h2
            className={clsx(
              "text--center", styles.poppinsFont,
            )}
            style={{ color: "var(--ifm-color-primary)" }}
          >
            Codify Your Modern Delivery
          </h2>
          <p className={clsx(
            "text--center", styles.description
          )}>
            With configs, models, functions and rules
          </p>
          <ExampleScroller />
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="container">
          <div className="container text--center">
            <h2 className={clsx(
              "hero__subtitle", styles.poppinsFont,
            )} style={{ color: "var(--ifm-color-primary)" }}>
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

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="container">
          <div className="container text--center">
            <h2 className={clsx(
              "hero__subtitle", styles.poppinsFont,
            )} >
              KusionStack is in <Link to="https://cncf.io/">Cloud Native Computing Foundation</Link> landscape
            </h2>
            <br />
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
        <br></br>
        <br></br>
      </main>
    </Layout>
  )
}

export default Home