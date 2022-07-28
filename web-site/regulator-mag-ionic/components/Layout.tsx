import Head from 'next/head'
import Navbar from './Navbar'
import React, { FC } from 'react'

interface LayoutProps {
  title: string,
  children?:React.ReactNode
}

const Layout: FC<LayoutProps> = (props) => <>
  <Head>{props.title}</Head>
  <Navbar />
  <div>
    {props.children}
  </div>
  {/* <main className="min-h-screen pt-20 bg-primary-800 text-primary-100">{props.children}</main> */}
</>

export default Layout
