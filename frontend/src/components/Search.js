import { axiosInstance as axios } from "../axios";
import React, { useState } from "react";
import { Box, Select, TextInput, Button } from "grommet";

function Search() {
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [marketCapGTE, setMarketCapGTE] = useState();
  const [marketCapLTE, setMarketCapLTE] = useState();
  const [tier, setTier] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const TIER_OPTIONS = [
    "",
    "SS",
    "S+",
    "S",
    "S-",
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
    "NA",
  ];

  const companyNameOnChangeHandler = (event) => {
    setCompanyName(event.target.value);
  };

  const sectorOnChangeHandler = (event) => {
    setSector(event.target.value);
  };

  const industryOnChangeHandler = (event) => {
    setIndustry(event.target.value);
  };

  const countryOnChangeHandler = (event) => {
    setCountry(event.target.value);
  };

  const marketCapGTEOnChangeHandler = (event) => {
    setMarketCapGTE(event.target.value);
  };

  const marketCapLTEOnChangeHandler = (event) => {
    setMarketCapLTE(event.target.value);
  };

  const onSelectChangeHandler = (event) => {
    setTier(event.target.value);
  };

  const onSearchClickHandler = () => {
    const searchURL = createSearchURL(
      companyName,
      sector,
      industry,
      country,
      tier,
      marketCapGTE,
      marketCapLTE
    );
    axios.get("company/?" + searchURL).then((res) => {
      setSearchResult(res.data);
    });
  };

  return (
    <Box>
      <TextInput
        placeholder="Company Name"
        value={companyName}
        onChange={companyNameOnChangeHandler}
      />
      <TextInput
        placeholder="Sector"
        value={sector}
        onChange={sectorOnChangeHandler}
      />
      <TextInput
        placeholder="Industry"
        value={industry}
        onChange={industryOnChangeHandler}
      />
      <TextInput
        placeholder="Country"
        value={country}
        onChange={countryOnChangeHandler}
      />
      <TextInput
        placeholder="Market Cap >="
        type="number"
        value={marketCapGTE || ""}
        onChange={marketCapGTEOnChangeHandler}
      />
      <TextInput
        placeholder="Market Cap <="
        type="number"
        value={marketCapLTE || ""}
        onChange={marketCapLTEOnChangeHandler}
      />
      <Select options={TIER_OPTIONS} onChange={onSelectChangeHandler}></Select>
      <Button label="Search" onClick={onSearchClickHandler}></Button>
      {JSON.stringify(searchResult)}
    </Box>
  );
}

const createSearchURL = (
  companyName,
  sector,
  industry,
  country,
  tier,
  marketCapGTE,
  marketCapLTE
) => {
  let searchURL = "";
  if (companyName.length > 0) {
    searchURL += "name=" + companyName;
  }

  if (sector.length > 0) {
    if (searchURL.length > 0) searchURL += "&";
    searchURL += "sector=" + sector;
  }

  if (industry.length > 0) {
    if (searchURL.length > 0) searchURL += "&";
    searchURL += "industry=" + industry;
  }

  if (country.length > 0) {
    if (searchURL.length > 0) searchURL += "&";
    searchURL += "country=" + country;
  }

  if (tier.length > 0) {
    if (searchURL.length > 0) searchURL += "&";
    searchURL += "tier=" + tier;
  }

  if (marketCapGTE != null && marketCapGTE.length) {
    if (searchURL.length > 0) searchURL += "&";
    searchURL += "marketcap_gte=" + marketCapGTE;
  }

  if (marketCapLTE != null && marketCapLTE.length > 0) {
    if (searchURL.length > 0) searchURL += "&";
    searchURL += "marketcap_lte=" + marketCapLTE;
  }

  return searchURL;
};

export { Search };
