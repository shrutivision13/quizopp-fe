import React from "react";
import { SeeAllButton } from "./SeeAllButton";

export const SectionHeading = ({ title, button, powerdBy, route }) => (
  <div className="mb-14">
    <div className="flex justify-between items-center ">
      <h2 className="text-18 font-black text-CFFFFFF">{title}</h2>
      {
        button && <SeeAllButton name={button} route={route} />
      }
    </div>
    {powerdBy && (
      <p className="flex text-12 font-normal italic text-CFAFAFA">
        <span className="mr-4">Powered by</span>
        <img
          alt="Gamezop"
          loading="lazy"
          width={65}
          height={16}
          decoding="async"
          style={{ color: "transparent" }}
          src="https://static.quizzop.com/newton/assets/gamezop-logo-dark.svg"
        />
      </p>
    )}
  </div>
);
