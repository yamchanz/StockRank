import { useParams } from "react-router-dom";
import React, { memo } from "react";

const WatchListDetail = memo(() => {
  let { watchlistId } = useParams();
  return <div>{watchlistId}</div>;
});

export { WatchListDetail };
