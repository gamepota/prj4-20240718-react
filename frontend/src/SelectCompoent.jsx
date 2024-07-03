// SelectComponent.jsx
import React from "react";
import { Box, Checkbox, CheckboxGroup } from "@chakra-ui/react";

const SelectComponent = ({ selectedCategories, onCategoryChange }) => {
  return (
    <CheckboxGroup value={selectedCategories} onChange={onCategoryChange}>
      <Box>
        <Checkbox value="MT1">강아지</Checkbox>
        <Checkbox value="CS2">고양이</Checkbox>
        <Checkbox value="SC4">햄스터</Checkbox>
        <Checkbox value="AC5">고슴도치</Checkbox>
        <Checkbox value="PK6">조류</Checkbox>
        <Checkbox value="OL7">파충류</Checkbox>
        <Checkbox value="SW8">양서류</Checkbox>
        <Checkbox value="BK9">야간진료</Checkbox>
        <Checkbox value="CT1">주말영업</Checkbox>
        <Checkbox value="AG2">호텔링</Checkbox>
      </Box>
    </CheckboxGroup>
  );
};

export default SelectComponent;
