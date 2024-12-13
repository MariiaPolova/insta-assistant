import './globals.css';
export const metadata = {
  title: 'Insta assistant',
  description: 'Assistant app to work with instagram posts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
