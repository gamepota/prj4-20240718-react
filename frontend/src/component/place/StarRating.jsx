import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const RatingContainer = ({ children }) => (
  <Box display="flex" textAlign="center" my={3}>
    {children}
  </Box>
);

const RatingStar = ({ isFilled, onClick }) => (
  <IconButton
    aria-label="star"
    icon={isFilled ? <AiFillStar /> : <AiOutlineStar />}
    size="lg"
    variant="ghost"
    color={isFilled ? "coral" : "gray.300"}
    onClick={onClick}
    _hover={{ color: isFilled ? "coral" : "gray.500" }}
  />
);

const PIndex = ({ children }) => <Text mx={2}>{children}</Text>;

export function StarRating({ ratingIndex, setRatingIndex }) {
  const arrayIndexes = [1, 2, 3, 4, 5];

  return (
    <RatingContainer>
      {arrayIndexes.map((arrayIndex) => (
        <RatingStar
          size={35}
          key={arrayIndex}
          isFilled={arrayIndex <= ratingIndex}
          onClick={() => setRatingIndex(arrayIndex)}
          style={{
            color: arrayIndex <= ratingIndex ? "coral" : "#d3d3d3",
          }}
        />
      ))}
      <PIndex>
        {ratingIndex === 5
          ? "아주 좋아요"
          : ratingIndex === 4
            ? "맘에 들어요"
            : ratingIndex === 3
              ? "보통이에요"
              : ratingIndex === 2
                ? "그냥 그래요"
                : "별로에요"}
      </PIndex>
    </RatingContainer>
  );
}

StarRating.propTypes = {
  ratingIndex: PropTypes.number.isRequired,
  setRatingIndex: PropTypes.func.isRequired,
};
