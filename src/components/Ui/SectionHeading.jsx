import React from "react";
import { SeeAllButton } from "./SeeAllButton";

export const SectionHeading = ({ title, route }) => (
  <div className="flex justify-between items-center mb-14">
    <h2 className="text-18 font-black text-CFFFFFF">{title}</h2>
    <SeeAllButton route={route} />
  </div>
);
