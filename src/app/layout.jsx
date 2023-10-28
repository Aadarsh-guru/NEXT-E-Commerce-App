import Header from '@/components/header/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import { Toaster } from 'react-hot-toast'
import Providers from '@/context/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'this is the book store site.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full max-w-[1280px] px-5 md:px-10 mx-auto`}>
        <Providers>
          <header>
            <Header />
            <Toaster />
          </header>
          <main className='min-h-screen' >
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  )
}
