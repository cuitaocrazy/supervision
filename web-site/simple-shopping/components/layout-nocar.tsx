import Head from 'next/head'
import NavbarNoCar from './Navbar-nocar'
import { FC } from 'react'

interface LayoutProps {
  title: string
}

const LayoutNoCar: FC<LayoutProps> = (props) => <>
  <Head>{props.title}</Head>
  <NavbarNoCar />
  <main className="min-h-screen pt-20 bg-primary-800 text-primary-100">{props.children}</main>
</>

export default LayoutNoCar
