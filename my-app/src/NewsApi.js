import axios from "axios";
import React, { useEffect, useState } from "react";

const NewsApi = () => {
  const [stockDataState, setStockDataState] = useState(null);
  useEffect(() => {
    const symbols = ["AAPL", "MSFT", "TSLA"];
    const fetchData = async (symbols) => {
      const axiosRequests = symbols.map((symbol) => {
        const options = {
          method: "GET",
          url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/${symbol}`,
          headers: {
            "X-RapidAPI-Key":
              "976181ede8msh8db849df77064aep11246cjsn64c186ae1e1a",
            "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
          },
        };
        return axios.request(options)
      });
      const results = await Promise.all(axiosRequests)
      const news = results.map((response)=>{
        return response.data.item.slice(0,5)
      })
      console.log(news)

      // const options = {
      //   method: "GET",
      //   url: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/AAPL",
      //   headers: {
      //     "X-RapidAPI-Key":
      //       "976181ede8msh8db849df77064aep11246cjsn64c186ae1e1a",
      //     "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
      //   },
      // };

      // try {
      //   const response = await axios.request(options);
      //   console.log(response.data);
      //   setStockDataState(response.data);
      // } catch (error) {
      //   console.error(error);
      // }

    };
    fetchData(symbols);
  }, []);

  return <div></div>;
};
export default NewsApi;
