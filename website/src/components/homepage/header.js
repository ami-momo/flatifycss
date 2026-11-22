import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./header.css";

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const version = siteConfig.customFields?.version;

  return (
    <div className="homepage-header">
      <h1 className="homepage-title">FlatifyCSS</h1>
      <p className="homepage-subtitle">Modern flat design framework for the web, inspired by Duolingo design system.</p>
      <span aria-hidden={true} className="animated-logo"></span>

      <Link to="/docs/intro" className={`get-started-button button bordered size-2x style-light`}>
        Get Started
      </Link>
      <a
        href="https://react-flatifycss.amimomo.me"
        target="_blank"
        rel="noopener"
        className={`get-started-button button bordered size-2x style-blue`}
      >
        React FlatifyCSS
      </a>
      {version && (
        <a
          style={{ display: "block" }}
          href="https://github.com/ami-momo/flatifycss/releases"
          rel="nofollow noopener"
          target="_blank"
          className={`size-sm opacity-60 color-dark`}
        >
          Last stable release: {version}
        </a>
      )}
    </div>
  );
}
