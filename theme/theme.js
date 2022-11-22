import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#4FD1C5", // teal.300
    secondary: "#2c3d55",
  },
  styles: {
    global: {
      h1: {
        color: "secondary",
      },
      h2: {
        color: "secondary",
      },
      h3: {
        color: "secondary",
      },
      h4: {
        color: "secondary",
      },
      h5: {
        color: "secondary",
      },
      h6: {
        color: "secondary",
      },
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
