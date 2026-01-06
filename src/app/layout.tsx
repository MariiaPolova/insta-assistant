import { ThemeProvider } from '../context/themeContext';
import AuthProvider from '../providers/AuthProvider';
import './globals.css';
export const metadata = {
  title: 'Insta assistant',
  description: 'Assistant app to work with instagram posts',
}
console.log('process.env.NEXT_PUBLIC_API_URL');
console.log(process.env.NEXT_PUBLIC_API_URL);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark:bg-gray-800'>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
