import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-gradient-to-tr from-yellow-500 dark:from-yellow-800 via-blue-500 dark:via-blue-800 to-rose-500 dark:to-rose-800 scroll'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
