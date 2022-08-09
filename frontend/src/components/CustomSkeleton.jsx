import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

const CustomSkeleton = ({ number, lines }) => {
  return [...new Array(number)].map((item, ind) => (
    <Box key={ind} mb={5}>
      <SkeletonCircle />
      <SkeletonText noOfLines={lines} mt="7px" />
    </Box>
  ));
};

export default CustomSkeleton;
