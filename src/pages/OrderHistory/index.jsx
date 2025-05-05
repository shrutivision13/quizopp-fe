import React from "react";

const OrderHistory = () => {
  return (
    <div className="py-20 border-b-1 border-CEDEDED dark:border-C20213F">
      <p className="px-20 text-10 dark:text-CFAFAFA font-medium">
        05 May, 2025
      </p>
      <div className="py-20 flex flex-row px-20 justify-between items-center">
        <div className="flex-1 flex flex-row">
          <div className="min-w-32 min-h-32">
            <img
              alt="contest"
              loading="lazy"
              width="40"
              height="40"
              decoding="async"
              data-nimg="1"
              src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcoins-order-icon.png&w=48&q=75"
              style={{ color: "transparent" }}
            />
          </div>
          <div className="ml-10" data-testid="order-history-text-0">
            <div className="text-C24A561 font-bold text-12">Success</div>
            <div className="text-14 max-w-228 dark:text-C8789C3">
              Won in Brain Teasers Quiz Contest!
            </div>
            <div
              className="text-10 max-w-228 text-C959595 dark:text-C8789C3"
              data-testid="order-id"
            >
              #vVFfSfSJpmSmp
            </div>
          </div>
        </div>
        <div className="text-16 font-black flex items-center dark:text-CFFFFFF">
          <span className="mr-8">
            <img
              alt="coin"
              loading="lazy"
              width="16"
              height="14.5"
              decoding="async"
              data-nimg="1"
              src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcoin.png&w=16&q=75"
              style={{ color: "transparent" }}
            />
          </span>
          <span data-testid="order-history-coins">1,000</span>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
