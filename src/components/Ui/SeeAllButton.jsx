import React from "react";
import arrow from "../../assets/images/next-arrow-yellow.svg";

export const SeeAllButton = () => (
  <a href="/category">
    <div className="w-full flex cursor-pointer items-center">
      <p
        className="text-10 font-bold uppercase text-CFFCC5B mr-4"
        data-testid="contest-see-all-button"
      >
        See All
      </p>
      <img
        alt="arrow filled icon"
        fetchPriority="high"
        width="16"
        height="16"
        decoding="async"
        data-nimg="1"
        style={{ color: "transparent" }}
        src={arrow}
      />
    </div>
  </a>
);
