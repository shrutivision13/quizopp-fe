import React, { Fragment } from 'react';
import RatingStar from '../Icons/RatingStar';

const RatingComponent = ({
  rating = 0,
  onChange = () => { },
  totalStars = 5,
  label = 'Rate this article',
  showThankYou = false,
}) => {
  return (
    <Fragment>
      {
        !showThankYou ?
          <div className="mt-24 flex items-center justify-center flex-col">
            <div className="font-black text-C676767 dark:text-CFAFAFA text-18 mb-14">
              <p data-testid="rate-this-article">{label}</p>
            </div>
            <div className="flex items-center justify-center mb-24">
              <div className="flex">
                {[...Array(totalStars)].map((_, index) => {
                  const value = index + 1;
                  return (
                    <React.Fragment key={value}>
                      <input
                        type="radio"
                        name="rating"
                        id={`rating-${value}`}
                        className={`ratingInput ratingInput${value}`}
                        value={value}
                        checked={rating === value}
                      />
                      <label
                        htmlFor={`rating-${value}`}
                        className="ratingLabel mr-30 last:mr-0"
                        data-testid={`rate-article-star-${value}`}
                        onClick={() => onChange(value)}
                      >
                        <RatingStar filled={rating >= value} />
                      </label>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          :
          <div className='my-24 flex items-center justify-center text-18 font-black text-C676767 dark:text-CFAFAFA grow-up'>
            Thank You
          </div>
      }
    </Fragment>
  );
};

export default RatingComponent;
