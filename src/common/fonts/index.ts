// next
import { Inter, Jost } from 'next/font/google';
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

export { GeistSans as geist };