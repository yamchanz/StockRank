import { axiosInstance as axios } from "../axios";
import React, { useState, useEffect } from "react";

function Watchlist() {
  const [watchlist, setWatchlist] = useState("");

  useEffect(() => {
    axios
      .get("watchlist/")
      .then((res) => {
        console.log(res);
        setWatchlist(res.data["protected"]);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setWatchlist("You are unauthorized");
        }
      });
  }, []);

  return <div>{watchlist}</div>;
}

export { Watchlist };
