import { FC } from 'react'
import { motion } from 'framer-motion'

interface NavbarProps {
  title: string
}

const Navbar: FC<NavbarProps> = (props) => {
  return (
    //   <nav className='grid h-10 grid-cols-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
    //   <div className='col-span-9'>{props.title}</div>
    //   <div className='text-center'>
    //     <svg className="w-5 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
    //     <motion.div key="2" className={'absolute top-2 right-5 '} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.2 }}><span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span></motion.div>
    //   </div>
    // </nav>
    <nav className='h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto'>
      <div className='text-center'>{props.title}</div>
    </nav>
  )
}

export default Navbar