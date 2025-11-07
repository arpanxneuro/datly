import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

/** ================================
 * 🏠 Homepage Header
 * --------------------------------
 * Showcases the title, tagline, and quick CTAs
 * ================================ */
function HomepageHeader(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container text--center">
        <Heading as="h1" className="hero__title">
          🧭 {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          {siteConfig.tagline || "Mock JSON API for developers"}
        </p>

        <div className={clsx("margin-top--lg", styles.buttons)}>
          <Link
            className="button button--secondary button--lg margin--sm"
            to="/getting-started"
          >
            🚀 Get Started
          </Link>
          <Link
            className="button button--outline button--lg margin--sm"
            to="/api/users"
          >
            📘 View API Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

/** ================================
 * 💡 Feature Card Component
 * --------------------------------
 * A reusable UI element for highlighting key offerings
 * ================================ */
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: string;
}) {
  return (
    <div className="col col--4">
      <div className={clsx("card shadow--md", styles.featureCard)}>
        <div className="card__header text--center">
          <Heading as="h3">
            {icon && <span className="margin-right--xs">{icon}</span>}
            {title}
          </Heading>
        </div>
        <div className="card__body text--center">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

/** ================================
 * 🌍 Homepage Layout
 * --------------------------------
 * Combines all major sections into one cohesive UX flow
 * ================================ */
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Free Mock JSON API for Developers`}
      description="Datly provides realistic, ready-to-use mock REST APIs for developers, learners, and testers."
    >
      <HomepageHeader />

      <main>
        {/* Core Features Section */}
        <section className={clsx("margin-vert--xl", styles.featuresSection)}>
          <div className="container">
            <div className="row">
              <FeatureCard
                icon="⚡"
                title="Instant Mock Data"
                description="Access ready-to-use endpoints for users, products, posts, and analytics — with zero setup."
              />
              <FeatureCard
                icon="🧩"
                title="Realistic Schemas"
                description="Simulate authentic data structures for production-like testing and prototyping."
              />
              <FeatureCard
                icon="🚀"
                title="Developer Friendly"
                description="Integrates seamlessly with Axios, Postman, Fetch API, or any backend client."
              />
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className={clsx("hero hero--dark", styles.ctaSection)}>
          <div className="container text--center">
            <Heading as="h2">Ready to Explore Datly?</Heading>
            <p className="hero__subtitle">
              Start using Datly API in seconds. No authentication, no rate
              limits — just data.
            </p>
            <Link
              className="button button--secondary button--lg margin-top--md"
              to="/getting-started"
            >
              Start Now →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
