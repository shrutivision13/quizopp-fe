import React from "react";
import { SeeAllButton } from "./SeeAllButton";
import adgrowUpLogo from "../../assets/images/adgroup.png";

export const SectionHeading = ({ title, button, powerdBy, route }) => (
  <div className="mb-14">
    <div className="flex justify-between items-center ">
      <h2 className="text-18 font-black text-CFFFFFF">{title}</h2>
      {
        button && <SeeAllButton name={button} route={route} />
      }
    </div>
    {powerdBy && (
      <p className="flex text-12 font-normal italic text-CFAFAFA items-center">
        <span className="mr-4">Powered by</span>
        <img
          alt="AdGrowUp"
          loading="lazy"
          width={80}
          height={5}
          decoding="async"
          style={{ color: "transparent", height: "10px", width: "65px" }}
          src={adgrowUpLogo}
        />
      </p>
    )}
  </div>
);
