import React from "react";
import { Button, HStack } from "@chakra-ui/react";

const DiaryPagination = ({
  pageInfo,
  pageNumbers,
  handlePageButtonClick,
  maxPageButtons = 10, // 최대 페이지 버튼 수를 설정합니다.
}) => {
  const { currentPageNumber, nextPageNumber, prevPageNumber, lastPageNumber } =
    pageInfo;

  // 현재 페이지 그룹을 계산합니다.
  const currentPageGroup = Math.ceil(currentPageNumber / maxPageButtons);
  const startPageNumber = (currentPageGroup - 1) * maxPageButtons + 1;
  const endPageNumber = Math.min(
    currentPageGroup * maxPageButtons,
    lastPageNumber,
  );

  return (
    <HStack spacing={2} justifyContent="center" mt={4}>
      {prevPageNumber && (
        <Button onClick={() => handlePageButtonClick(1)}>처음</Button>
      )}
      {prevPageNumber && (
        <Button onClick={() => handlePageButtonClick(prevPageNumber)}>
          이전
        </Button>
      )}
      {pageNumbers
        .slice(startPageNumber - 1, endPageNumber)
        .map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => handlePageButtonClick(pageNumber)}
            colorScheme={pageNumber === currentPageNumber ? "blue" : "gray"}
          >
            {pageNumber}
          </Button>
        ))}
      {nextPageNumber && (
        <Button onClick={() => handlePageButtonClick(nextPageNumber)}>
          다음
        </Button>
      )}
      {nextPageNumber && (
        <Button onClick={() => handlePageButtonClick(lastPageNumber)}>
          마지막
        </Button>
      )}
    </HStack>
  );
};

export default DiaryPagination;
