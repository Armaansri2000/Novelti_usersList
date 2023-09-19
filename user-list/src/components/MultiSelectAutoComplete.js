import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";

function MultiSelectAutocomplete({
  label,
  userData,
  setUserData,
  optionsList,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (event, newValue) => {
    setSelectedOptions(newValue);
    let temp = userData;
    temp[label] = newValue;
    setUserData(temp);
  };

  useEffect(() => {
    if (userData.country.length > 0 && selectedOptions.length == 0) {
      setSelectedOptions(userData.country);
    }
  });

  return (
    <div className="input">
      <Autocomplete
        multiple
        id="multi-select"
        options={optionsList}
        value={selectedOptions}
        onChange={handleOptionChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={"Select " + label}
            placeholder={"Select " + label}
          />
        )}
      />
    </div>
  );
}

export default MultiSelectAutocomplete;
