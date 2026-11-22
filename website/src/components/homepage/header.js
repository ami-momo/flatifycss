import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import "./header.css";

export default function HomepageHeader() {
  const [stableVersion, setStableVersion] = useState();

  // The latest GitHub release is fetched when the page loads, so a new release
  // shows up without rebuilding the docs. Nothing is shown if the request fails.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://api.github.com/repos/ami-momo/flatifycss/releases");
        const data = await response.json();
        if (Array.isArray(data) && data[0]?.tag_name) setStableVersion(data[0].tag_name.replace("v", ""));
      } catch {
        // offline or rate limited, the version line is optional
      }
    }
    fetchData();
  }, []);

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
      <a
        style={{ display: "block" }}
        href="https://github.com/ami-momo/flatifycss/releases"
        rel="nofollow noopener"
        target="_blank"
        className={`size-sm opacity-60 color-dark`}
      >
        {stableVersion && <span className="anim-fade-in"> Last stable release: {stableVersion}</span>}
      </a>
    </div>
  );
}
