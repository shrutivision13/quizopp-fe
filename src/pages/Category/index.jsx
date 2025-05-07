import React, { useEffect, useState, useRef } from "react";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import AdSlot from "../../components/AdSense/AdSlot";
import { ApiGetCategories } from "../../api-wrapper/categories/ApiCategories";

function Category() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const filterRef = useRef(null);

  useEffect(() => {
    ApiGetCategories()
      .then((res) => {
        if (res.isSuccess) {
          setCategories(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex px-20 mt-14">
        <div className="mr-10 flex-1 flex justify-between items-center rounded-10 border bg-CFFFFFF border-CFFFFFF dark:border-C26284C  dark:bg-C20213F h-50 shadow-searchFilter">
          <div className=" ml-16 mr-10">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-C676767 dark:text-C8789C3"
            >
              <path d="M15.7719 14.113L12.5789 10.92C13.2655 9.96352 13.6749 8.83625 13.7621 7.66215C13.8493 6.48806 13.611 5.31266 13.0733 4.26527C12.5357 3.21788 11.7195 2.33908 10.7147 1.72558C9.70985 1.11208 8.55525 0.787642 7.37792 0.787964C5.67912 0.787964 4.04988 1.46274 2.84855 2.66388C1.64722 3.86503 0.972189 5.49416 0.971924 7.19297C0.971917 8.37004 1.29653 9.52432 1.91005 10.5289C2.52358 11.5334 3.40225 12.3493 4.44944 12.8868C5.49663 13.4243 6.67177 13.6626 7.84562 13.5754C9.01947 13.4883 10.1466 13.0792 11.1029 12.393L14.2969 15.588C14.4953 15.7695 14.756 15.8676 15.0249 15.8616C15.2937 15.8557 15.5499 15.7462 15.7401 15.5561C15.9302 15.366 16.0396 15.1098 16.0456 14.8409C16.0515 14.5721 15.9535 14.3113 15.7719 14.113ZM4.32592 10.245C3.61957 9.53881 3.17993 8.60957 3.08192 7.6156C2.98391 6.62163 3.23358 5.62442 3.7884 4.79391C4.34323 3.96339 5.16886 3.35095 6.12463 3.06094C7.08039 2.77094 8.10714 2.82132 9.02993 3.20349C9.95271 3.58567 10.7144 4.27599 11.1853 5.15684C11.6561 6.03768 11.807 7.05454 11.6121 8.03414C11.4173 9.01375 10.8888 9.89548 10.1167 10.5291C9.34462 11.1627 8.37672 11.509 7.37792 11.509C6.81091 11.5105 6.24922 11.3995 5.72535 11.1826C5.20148 10.9656 4.72584 10.6469 4.32592 10.245Z"></path>
            </svg>
          </div>
          <div className=" w-full">
            <input
              data-testid="search-bar"
              className="h-40 w-full rounded-full text-[14px] outline-none text-C959595 placeholder:text-C959595 dark:text-C8789C3 placeholder:dark:text-C8789C3 bg-CFFFFFF dark:bg-C20213F"
              placeholder={
                searchTerm === "" ? "Search for topics you like" : ""
              } // Conditional placeholder
              value={searchTerm} // Bind input value to state
              onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
              onFocus={(e) => (e.target.placeholder = "")} // Remove placeholder on focus
              onBlur={(e) =>
                (e.target.placeholder = "Search for topics you like")
              } // Restore placeholder on blur
            />
          </div>
        </div>
        <div className="relative inline-block text-left" ref={filterRef}>
          <div
            className="flex justify-center items-center w-48 h-48 border border-CFFFFFF bg-CFFFFFF dark:bg-C20213F dark:border-C26284C rounded-10 cursor-pointer shadow-filter"
            data-testid="filter-button"
            onClick={() => setIsFilterOpen(!isFilterOpen)} // Toggle filter dropdown
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-C676767 dark:text-C8789C3"
            >
              <rect
                x="4"
                y="4"
                width="16"
                height="2"
                className="fill-current"
              ></rect>
              <path
                d="M4 8H20L14 14V19L10 20V14L4 8Z"
                className="fill-current"
              ></path>
              <path
                className="fill-current text-CFFFFFF dark:text-C20213F"
                d="M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V6.17C1.99986 6.58294 2.08497 6.99147 2.25 7.37V7.43C2.39128 7.75097 2.59139 8.04266 2.84 8.29L9 14.41V21C8.99966 21.1699 9.04264 21.3372 9.12487 21.4859C9.20711 21.6346 9.32589 21.7599 9.47 21.85C9.62914 21.9486 9.81277 22.0006 10 22C10.1565 21.9991 10.3107 21.9614 10.45 21.89L14.45 19.89C14.6149 19.8069 14.7536 19.6798 14.8507 19.5227C14.9478 19.3656 14.9994 19.1847 15 19V14.41L21.12 8.29C21.3686 8.04266 21.5687 7.75097 21.71 7.43V7.37C21.8888 6.99443 21.9876 6.58578 22 6.17V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM13.29 13.29C13.1973 13.3834 13.124 13.4943 13.0742 13.6161C13.0245 13.7379 12.9992 13.8684 13 14V18.38L11 19.38V14C11.0008 13.8684 10.9755 13.7379 10.9258 13.6161C10.876 13.4943 10.8027 13.3834 10.71 13.29L5.41 8H18.59L13.29 13.29ZM20 6H4V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V6Z"
              ></path>
            </svg>
          </div>
          {isFilterOpen && ( // Render filter options if dropdown is open
            <div
              className="absolute right-0 z-10 mt-10 w-[180px] pt-20 pb-20 border border-CFFFFFF bg-CFFFFFF dark:bg-C20213F dark:border-C26284C origin-top-right rounded-10 shadow-filterContainer ring-1 ring-[#FFFFFF] dark:ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div
                data-testid="filter-all-button"
                className="px-20 flex cursor-pointer dark:text-CFFFFFF mb-12"
                onClick={() => setSelectedFilter("ALL")} // Update selected filter
              >
                <input
                  id="ALL"
                  type="radio"
                  className="mr-10 form-radio custom-radio-button"
                  value="ALL"
                  checked={selectedFilter === "ALL"}
                  readOnly
                />
                <label htmlFor="ALL" className="text-14 w-full cursor-pointer">
                  All
                </label>
              </div>
              <div
                data-testid="filter-liked-button"
                className="px-20 flex cursor-pointer dark:text-CFFFFFF mb-12"
                onClick={() => setSelectedFilter("LIKED_TOPICS")} // Update selected filter
              >
                <input
                  id="LIKED_TOPICS"
                  type="radio"
                  className="mr-10 form-radio custom-radio-button"
                  value="LIKED_TOPICS"
                  checked={selectedFilter === "LIKED_TOPICS"}
                  readOnly
                />
                <label
                  htmlFor="LIKED_TOPICS"
                  className="text-14 w-full cursor-pointer"
                >
                  Liked Topics
                </label>
              </div>
              <div
                data-testid="filter-other-button"
                className="px-20 flex cursor-pointer dark:text-CFFFFFF"
                onClick={() => setSelectedFilter("OTHER_TOPICS")} // Update selected filter
              >
                <input
                  id="OTHER_TOPICS"
                  type="radio"
                  className="mr-10 form-radio custom-radio-button"
                  value="OTHER_TOPICS"
                  checked={selectedFilter === "OTHER_TOPICS"}
                  readOnly
                />
                <label
                  htmlFor="OTHER_TOPICS"
                  className="text-14 w-full cursor-pointer"
                >
                  Other Topics
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      <section className="px-20 mt-8">
        <div className="flex justify-between items-center mb-14"></div>
        <div className="grid grid-cols-3 gap-14">
          {categories?.slice(0, 6).map((category) => (
            <CategoryCard
              key={category?._id}
              category={category}
              removeHeader={true}
            />
          ))}
        </div>
      </section>
      <div className="w-full px-0 mt-10">
        {" "}
        <AdSlot
          slotId="ad-slot-1"
          adUnitPath="/123456/ad-unit"
          sizes={[728, 250]}
        />
      </div>
      <section className="px-20 mt-8">
        <div className="grid grid-cols-3 gap-14 mt-14">
          {categories?.slice(6).map((category) => (
            <CategoryCard
              key={category?._id}
              category={category}
              removeHeader={true}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Category;
