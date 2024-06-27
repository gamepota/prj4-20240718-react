import React from "react";
import { Button, Center, Flex } from "@chakra-ui/react";

const Pagination = ({ pageInfo, pageNumbers, handlePageButtonClick }) => {
  return (
    <Center>
      <Flex>
        {pageInfo.prevPageNumber && (
          <>
            <Button onClick={() => handlePageButtonClick(1)}>맨앞</Button>
            <Button
              onClick={() => handlePageButtonClick(pageInfo.prevPageNumber)}
            >
              이전
            </Button>
          </>
        )}
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            w="10"
            onClick={() => handlePageButtonClick(pageNumber)}
            colorScheme={
              pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
            }
          >
            {pageNumber}
          </Button>
        ))}
        {pageInfo.nextPageNumber && (
          <>
            <Button
              onClick={() => handlePageButtonClick(pageInfo.nextPageNumber)}
            >
              다음
            </Button>
            <Button
              onClick={() => handlePageButtonClick(pageInfo.lastPageNumber)}
            >
              맨뒤
            </Button>
          </>
        )}
      </Flex>
    </Center>
  );
};

export default Pagination;
