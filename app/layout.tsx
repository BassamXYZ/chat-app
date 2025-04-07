import '../styles/global.css'
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Chat App',
  description: 'Real Time Chat App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}