import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#4FD1C5", // teal.300
    secondary: "#2c3d55"
  },
  styles: {
    global: {
      body: {
        color: "secondary",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "xl",
      },
    },
    IconButton: {
      baseStyle: {
        borderRadius: "xl",
      },
    },
    Input: {
      sizes: {
        lg: {
          field: {
            borderRadius: "2xl",
          },
        },
      },
    },
  },
});

export default theme;
