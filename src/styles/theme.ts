import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
    }

  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  styles: {
    global: {
      'body': {
        bg: 'white',
        color: 'gray.900',
        height: '100%'
      },
      'html': {
        height: '100%'
      },
      'body > div:first-child': {
        height: '100%'
      },
      'div#__next': {
        height: '100%'
      },
      'div#__next > div': {
        height: '100%'
      },
    }
  },
})