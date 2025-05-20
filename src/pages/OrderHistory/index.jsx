import React, { useEffect, useState } from "react";
import { ApiGetCoinHistory } from "../../api-wrapper/user/ApiUser";
import { useLoader } from "../../context/LoaderContext";
import CoinHistoryCard from "../../components/CoinHistoryCard/CoinHistoryCard";

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);
    ApiGetCoinHistory()
      .then((res) => {
        if (res?.isSuccess) {
          setHistory(res?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  return (
    <>
      {history?.map((item) => (
        <div key={item.date} className="py-20 border-b-1 border-CEDEDED dark:border-C20213F">
          <p className="px-20 text-10 dark:text-CFAFAFA font-medium">
            {formatDate(item?.date)}
          </p>
          {item?.entries?.map((entrie) => (
            <CoinHistoryCard entrie={entrie}/>
          ))}
        </div>
      ))}
    </>
  );
};
export default OrderHistory;
