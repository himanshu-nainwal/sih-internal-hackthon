import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SIH Internal Hackathon - GEHU Bhimtal',
  description: 'Smart India Hackathon Internal Competition at Graphic Era Hill University, Bhimtal',
  keywords: 'hackathon, SIH, GEHU, Bhimtal, competition, coding',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}