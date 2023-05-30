import './globals.css';
import { Inter } from 'next/font/google';

import { FirebaseProviders } from '@/lib/FirebaseProviders';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Remarkable',
  description: 'Remarks. Markable. Remarkable!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseProviders>
          {children}
        </FirebaseProviders>
      </body>
    </html>
  )
}
