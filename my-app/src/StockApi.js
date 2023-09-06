import axios from "axios";
import React, { useEffect, useState } from "react";

const StockApi = () => {
  const [stockDataState, setStockDataState] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL,MSFT",
        headers: {
          "X-RapidAPI-Key":
            "976181ede8msh8db849df77064aep11246cjsn64c186ae1e1a",
          "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setStockDataState(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th> Symbol </th>
            <th> Display Name </th>
            <th> Fifty Two Week Low</th>
            <th> Fifty Two Week High </th>
          </tr>
        </thead>
        <tbody>{stockDataState && stockDataState.map((stock)=>{
          return (<tr> 
            <td>{stock.symbol}</td> 
            <td>{stock.displayName}</td> 
            <td>{stock.fiftyTwoWeekLow}</td> 
            <td>{stock.fiftyTwoWeekHigh}</td> </tr>)
        })}</tbody>
      </table>
    </div>
  );
};

;

export default StockApi;
