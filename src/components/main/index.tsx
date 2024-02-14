import React from "react";
import { Box, useTheme } from "@chakra-ui/react";

import { Button } from "components";

export const Main: React.FC = () => {
  const theme = useTheme();
  return (
    <Box bg="main.100" color="main.200" textAlign="center" py={10}>
      <h1
        style={{
          fontSize: theme.fontSizes["5xl"],
          fontFamily: theme.fonts["heading"],
          margin: 0,
        }}
      >
        🥳 insert main message 🥳
      </h1>
    </Box>
  );
};
