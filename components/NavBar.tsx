
import Link from 'next/link'
import React from 'react'
import AuthButton from './AuthButton'
import { createClient } from '../utils/supabase/server'; 
import MobileNavbar from './MobileNavbar';

async function NavBar() {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  return (
    <nav className='text-[#001663] h-16 w-full fixed top-0 left-0 flex justify-between items-center px-4 z-10  bg-white shadow-lg md:px-20'>  
      <ul className='flex gap-2 items-center'>
        <MobileNavbar/>
      <Link href='/'><li className='text-[#001663] text-2xl font-extrabold '> Moniter<span className='text-[#11d594]'>X</span>  </li></Link>
      </ul>
      <ul className='hidden md:flex gap-10 items-center '>
      {user?<Link href='/monitorx' ><li> Home </li></Link> :<Link href='/' ><li> Home </li></Link>  }
      <Link href='/about'><li> About </li></Link>
      <Link href='/price'><li> Pricing </li></Link>
      <Link href='/help'><li> Help </li></Link>
      <Link href='/contact-us'><li> ContactUs </li></Link>
      </ul>

     {/* <AuthButton/> */}
    </nav>
  )
}

export default NavBar
