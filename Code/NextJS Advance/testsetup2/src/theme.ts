// Các thư viện UI mạnh
// Dùng chakra ui

import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
}

const config : ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({
  semanticTokens: {
    colors: {
      error: 'red.500',
      success: 'green.500',
      primary: {
        default: 'red.500',
        _dark: 'red.400',
        // senmaticTokens là để tạo điều kiện styles, nó check color scheme để light mode và dark mode thì sao
      },
      secondary: {
        default: 'red.800',
        _dark: 'red.100',
      },
      text: {
        default: '#16161D',
        _dark: '#ade3b8',
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
    },
    radii: {
      button: '12px',
    },
  },
  colors: {
    brand: {
      100: "red",
      500: "blue",
      900: "yellow",
    },
  },
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'bold', // Normally, it is "semibold"
      },
      // 2. We can add a new button size or extend existing
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
      // 3. We can add a new visual variant
      variants: {
        'with-shadow': {
          bg: 'red.400',
          boxShadow: '0 0 2px 2px #efdfde',
        },
        // 4. We can override existing variants
        solid: (props: StyleFunctionProps) => ({
          bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
        }),
        // 5. We can add responsive variants
        sm: {
          bg: 'teal.500',
          fontSize: 'md',
        },
      },
      // 6. We can overwrite defaultProps
      defaultProps: {
        size: 'lg', // default is md
        variant: 'sm', // default is solid
        // colorScheme: 'green', // default is gray
      },
    },
    styles: {
      global: {
        // styles for the `body`
        body: {
          bg: 'gray.400',
          color: 'white',
        },
        // styles for the `a`
        a: {
          color: 'teal.500',
          _hover: {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
  fonts,
  breakpoints,
  config
})

export default theme