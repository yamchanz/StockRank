import { axiosInstance as axios } from "../axios";
import React, { useState } from "react";
import { Box, Select, TextInput, Text, Button } from "grommet";
import { CompanyTable } from "./CompanyTable";

const Search = React.memo(() => {
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [marketCapGTE, setMarketCapGTE] = useState();
  const [marketCapLTE, setMarketCapLTE] = useState();
  const [tier, setTier] = useState("");
  const [searchResult, setSearchResult] = useState();

  const TIER_OPTIONS = [
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
    <Box pad="large" gap="medium">
      <Box gap="small">
        <Text>Company Name</Text>
        <TextInput
          placeholder="Starting with or Exact"
          value={companyName}
          onChange={companyNameOnChangeHandler}
        />
      </Box>
      <Box gap="small">
        <Text>Sector</Text>
        <TextInput
          placeholder="Ex. Technology"
          value={sector}
          onChange={sectorOnChangeHandler}
        />
      </Box>
      <Box gap="small">
        <Text>Industry</Text>
        <TextInput
          placeholder="Ex. Biotechnology"
          value={industry}
          onChange={industryOnChangeHandler}
        />
      </Box>
      <Box gap="small">
        <Text>Country</Text>
        <TextInput
          placeholder="Ex. United States"
          value={country}
          onChange={countryOnChangeHandler}
        />
      </Box>
      <Box gap="small">
        <Text>Market Cap Greater or Eaquals to</Text>
        <TextInput
          placeholder="Ex. 500000"
          type="number"
          value={marketCapGTE || ""}
          onChange={marketCapGTEOnChangeHandler}
        />
      </Box>
      <Box gap="small">
        <Text>Market Cap Less than or Eaquals to</Text>
        <TextInput
          placeholder="Ex. 100000000"
          type="number"
          value={marketCapLTE || ""}
          onChange={marketCapLTEOnChangeHandler}
        />
      </Box>
      <Box gap="small">
        <Text>Tier</Text>
        <Select
          clear
          closeOnChange
          options={TIER_OPTIONS}
          onChange={onSelectChangeHandler}
          defaultValue="A"
        ></Select>
      </Box>
      <Button label="Search" onClick={onSearchClickHandler}></Button>
      <CompanyTable companies={searchResult} />
    </Box>
  );
});

const capitalizeFirstChar = (str) => {
  return str[0].toUpperCase() + str.substr(1);
};

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
    searchURL += "name=" + capitalizeFirstChar(companyName);
  }

  if (sector.length > 0) {
    if (searchURL.length > 0) searchURL += "&";
    searchURL += "sector=" + capitalizeFirstChar(sector);
  }

  if (industry.length > 0) {
    if (searchURL.length > 0) searchURL += "&";
    searchURL += "industry=" + capitalizeFirstChar(industry);
  }

  if (country.length > 0) {
    if (searchURL.length > 0) searchURL += "&";
    searchURL += "country=" + capitalizeFirstChar(country);
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
