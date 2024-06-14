import { useState } from "react";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { Box, Flex } from "@chakra-ui/react";

export function StarRating() {
  const [rating, setRating] = useState(3);
  return (
    <Box>
      <Flex>
        {[...Array(rating)].map((a, i) => (
          <PiStarFill
            className="star-lg"
            key={i}
            onClick={() => setRating(i + 1)}
          />
        ))}
        {[...Array(5 - rating)].map((a, i) => (
          <PiStarLight
            className="star-lg"
            key={i}
            onClick={() => setRating(rating + i + 1)}
          />
        ))}
      </Flex>
    </Box>
  );
}
