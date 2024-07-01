import React from "react";
import { Button, Center, Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = ({ pageInfo, pageNumbers, handlePageButtonClick }) => {
  const buttonBg = useColorModeValue("gray.200", "gray.700");
  const activeButtonBg = useColorModeValue("blue.500", "blue.200");
  const textColor = useColorModeValue("black", "white");

  return (
    <Center mt={4} mb={4}>
      <Flex>
        {pageInfo.prevPageNumber && (
          <>
            <IconButton
              icon={<ArrowLeftIcon />}
              onClick={() => handlePageButtonClick(1)}
              aria-label="맨앞"
              bg={buttonBg}
              _hover={{ bg: activeButtonBg }}
              mr={2}
            />
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={() => handlePageButtonClick(pageInfo.prevPageNumber)}
              aria-label="이전"
              bg={buttonBg}
              _hover={{ bg: activeButtonBg }}
              mr={2}
            />
          </>
        )}
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            w={10}
            onClick={() => handlePageButtonClick(pageNumber)}
            bg={pageNumber === pageInfo.currentPageNumber ? activeButtonBg : buttonBg}
            color={pageNumber === pageInfo.currentPageNumber ? textColor : "inherit"}
            _hover={{ bg: activeButtonBg }}
            mr={2}
          >
            {pageNumber}
          </Button>
        ))}
        {pageInfo.nextPageNumber && (
          <>
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={() => handlePageButtonClick(pageInfo.nextPageNumber)}
              aria-label="다음"
              bg={buttonBg}
              _hover={{ bg: activeButtonBg }}
              ml={2}
            />
            <IconButton
              icon={<ArrowRightIcon />}
              onClick={() => handlePageButtonClick(pageInfo.lastPageNumber)}
              aria-label="맨뒤"
              bg={buttonBg}
              _hover={{ bg: activeButtonBg }}
              ml={2}
            />
          </>
        )}
      </Flex>
    </Center>
  );
};

export default Pagination;
