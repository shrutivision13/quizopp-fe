import React, { useEffect, useState } from 'react';
import PrimaryButton from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ApiGetCategories, ApiGetInitialCategory } from '../../api-wrapper/categories/ApiCategories';
import useCookie from '../../hooks/useCookie';
import { ApiGetStarted } from '../../api-wrapper/Auth/ApiGetStarted';
import AdSlot from '../../components/AdSense/AdSlot';
import { useLoader } from '../../context/LoaderContext';

const InitialPage = () => {
    const [categories, setCategories] = useState([]); // State for categories from API
    const [selectedTopics, setSelectedTopics] = useState([]);
    const navigate = useNavigate();
    const { setCookie } = useCookie();
    const { setLoading } = useLoader();


  useEffect(() => {
    setLoading(true);
    ApiGetInitialCategory()
      .then((res) => {
        if (res.isSuccess) {
          setCategories(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const handleSelect = (categoryId) => {
    setSelectedTopics((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

    const handleProceed = () => {
        ApiGetStarted({
            favouriteCategories: selectedTopics, // Send selected category IDs
        })
            .then((res) => {
                if (res?.isSuccess) {
                    setCookie('authToken', res.data.authToken);
                    setCookie('userData', JSON.stringify(res.data));

          localStorage.setItem("userData", JSON.stringify(res.data));

          if (selectedTopics.length > 0) {
            navigate("/start-quiz");
          } else {
            alert("Please select at least one topic to proceed.");
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  return (
    <>
      <AdSlot
        slotId="div-gpt-ad-1745314508467-0"
        adUnitPath="/23289596447/adx6"
        sizes={[336, 5]}
      />
      <div className="mb-28 mt-16">
        <p
          className="font-medium text-16 text-center text-CFAFAF9"
          data-testid="get-started-text"
        >
          Choose some topics you might like
        </p>
      </div>
      <div className="flex flex-col justify-between flex-1 hide-scroll-bar">
        <div className="pb-100 flex-grow">
          <div className="mx-auto flex flex-wrap px-20">
            {categories?.map((category) => {
              // Limit to 10 categories
              const isSelected = selectedTopics.includes(category._id);
              return (
                <div key={category._id} className="last:ml-0 mr-10 mb-10">
                  <button
                    onClick={() => handleSelect(category._id)}
                    className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer relative justify-center items-center flex border-1 border-C404380 bg-C20213F h-40 px-0 rounded-[99px]"
                    style={{
                      borderColor: isSelected ? "#fedc34" : "",
                    }}
                  >
                    <div className="flex justify-center pl-8 w-auto">
                      <img
                        alt={category.categoryName}
                        loading="lazy"
                        width="38"
                        height="38"
                        decoding="async"
                        className="h-27 w-38"
                        style={{ color: "transparent" }}
                        src={`http://132.148.0.110:3000/images/category/${category.categoryIcon}`}
                      />
                    </div>
                    <div className="z-10 w-full flex justify-center bottom-0 relative pr-12">
                      <p className="text-14 dark:text-CFFFFFF leading-16 font-semibold">
                        {category.categoryName}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-y-1 py-15 px-20 border-y-C8789C3 bg-C191A32 z-50 sticky bottom-0 w-full">
          <div role="button" tabIndex={0}>
            <PrimaryButton
              text={
                selectedTopics.length > 0
                  ? "Proceed"
                  : "Select At least 1 Topic"
              }
              disabled={selectedTopics.length === 0}
              shine={selectedTopics.length > 0}
              onClick={handleProceed}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InitialPage; 
