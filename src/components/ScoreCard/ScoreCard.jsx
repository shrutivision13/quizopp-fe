import React from 'react'

const ScoreCard = ({image}) => {
  return (
    <a href="https://6508.read.criczop.com">
          <div className="relative">
            <img
              alt="astrozop banner"
              loading="lazy"
              width="0"
              height="0"
              decoding="async"
              data-nimg="1"
              className="w-450 h-230 rounded-16 object-contain"
              style={{ color: "transparent" }}
              sizes="100vw"
              src={image}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-20 w-3/5">
              <div className="mb-20 text-20 leading-26 font-black text-CFFFFFF capitalize">
                <span className="homepage-banner_cricketBannerText__KxgLC">
                  live
                </span>{" "}
                <br /> cricket updates
              </div>
              <button className="text-14 leading-18 font-bold bg-CEFAD00 px-16 py-8 rounded-5 text-C2C2C2C uppercase">
                Click Here
              </button>
            </div>
          </div>
        </a>
  )
}

export default ScoreCard