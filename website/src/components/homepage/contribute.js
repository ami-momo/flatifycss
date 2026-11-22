import React from "react";
import svg from "../svg";
import "./contribute.css";

export default function HomepageContribute() {

  return (
    <div className="homepage-contribute">
      <div className="contribute-texts flex-column-center">
        <h2 className="homepage-h2 text-center">Keep it breathing</h2>
        <p className="homepage-para size-2x text-center">It is a one person project, so every issue, idea and pull request really helps.</p>
        <div className="flex-center">
          <a
            href="https://github.com/ami-momo/flatifycss"
            target="_blank"
            className={`button two-layer-button size-2x featured-button contribute-button style-light`}
          >
            Contribute
            <span className="secondary-text">{svg.github}</span>
          </a>
        </div>
      </div>
      <div className="contribute-icons">
        <div className="contributor-svg">{svg.contributor}</div>
        <div className="chain-svg">{svg.chain}</div>
      </div>
    </div>
  );
}
