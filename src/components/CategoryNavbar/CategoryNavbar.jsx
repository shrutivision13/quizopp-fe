import React from "react";
import { Link, NavLink } from "react-router-dom";
import AdSlot from "../AdSense/AdSlot";

const CategoryNavbar = ({ categories, handleClick }) => {
  return (
    <>
      <div className="fixed top-60 z-10 bg-CFAFAFA dark:bg-C191A32">
        <div className="flex border-b-2 border-CF1F1F1 dark:border-C26284C">
          <div className="flex whitespace-nowrap mx-20 pt-[16px] pb-[10px] px-[10px] cursor-pointer border-b-4 border-C3E51B5 dark:border-CFFCC5B">
            <p className="text-[14px] font-medium text-C3E51B5 dark:text-CFFFFFF">
              Home
            </p>
          </div>
          <div className="flex scroll snap-x overflow-x hide-scroll-view">
            {categories?.map((item) => (
              <Link
                key={item?._id}
                rel=""
                className=""
                to={`/blogs/${item?.categoryName
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}`}
                state={{ categoryId: item?._id }}
                // onClick={() => handleClick()}
              >
                <div className="flex whitespace-nowrap mx-20 pt-[16px] pb-[10px] px-[10px] cursor-pointer border-transparent">
                  <p className="text-[14px] font-medium text-C676767 dark:text-C8789C3">
                    {item?.categoryName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <AdSlot
        slotId="ad-slot-1"
        adUnitPath="/123456/ad-unit"
        sizes={[728, 5]}
        marginTop="mt-70"
      />
    </>
  );
};

export default CategoryNavbar;
