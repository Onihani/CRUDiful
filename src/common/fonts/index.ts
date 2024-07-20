// next
import { Inter, Jost, Playfair_Display } from 'next/font/google';
// imports
import { GeistSans } from 'geist/font/sans';
 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
})

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})

export { GeistSans as geist };