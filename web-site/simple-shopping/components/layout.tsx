import Head from 'next/head'
import Navbar from './navbar'
import { FC } from 'react'

interface LayoutProps {
  title: string
}

const Layout: FC<LayoutProps> = (props) => <>
  <Head>{props.title}</Head>
  <Navbar />
  <main className="min-h-screen text-primary-100 bg-primary-800">{props.children}</main>
</>

export default Layout
