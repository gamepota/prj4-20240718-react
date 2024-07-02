// SelectComponent.jsx
import React from "react";
import { Box, Checkbox, CheckboxGroup } from "@chakra-ui/react";

const SelectComponent = ({ selectedCategories, onCategoryChange }) => {
  return (
    <CheckboxGroup value={selectedCategories} onChange={onCategoryChange}>
      <Box>
        <Checkbox value="MT1">대형마트</Checkbox>
        <Checkbox value="CS2">편의점</Checkbox>
        <Checkbox value="PS3">어린이집, 유치원</Checkbox>
        <Checkbox value="SC4">학교</Checkbox>
        <Checkbox value="AC5">학원</Checkbox>
        <Checkbox value="PK6">주차장</Checkbox>
        <Checkbox value="OL7">주유소, 충전소</Checkbox>
        <Checkbox value="SW8">지하철역</Checkbox>
        <Checkbox value="BK9">은행</Checkbox>
        <Checkbox value="CT1">문화시설</Checkbox>
        <Checkbox value="AG2">중개업소</Checkbox>
        <Checkbox value="PO3">공공기관</Checkbox>
        <Checkbox value="AT4">관광명소</Checkbox>
        <Checkbox value="AD5">숙박</Checkbox>
        <Checkbox value="FD6">음식점</Checkbox>
        <Checkbox value="CE7">카페</Checkbox>
        <Checkbox value="HP8">병원</Checkbox>
        <Checkbox value="PM9">약국</Checkbox>
      </Box>
    </CheckboxGroup>
  );
};

export default SelectComponent;
