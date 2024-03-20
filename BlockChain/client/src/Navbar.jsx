// import React, { useEffect, useState } from 'react'
// import { useEth } from './contexts/EthContext';
import { Link } from 'react-router-dom';


function Navbar() {
  
    return (
  <>
    <div className="w-full flex px-9 py-3 text-black justify-between">
      <div className="brandName text-2xl font-extrabold cursor-pointer text-[#f66e1a]">Insure-Chain</div>
      <div className="navigator flex gap-3 text-[#05445E] items-center">
        <Link className='hover:text-[#189AB4] cursor-pointer duration-300 ease-in-out' to='/analyzer'>Insurance Company</Link>
        <Link className='hover:text-[#189AB4] cursor-pointer duration-300 ease-in-out' to='/'>Insurance Creation</Link>
        <Link className='hover:text-[#189AB4] cursor-pointer duration-300 ease-in-out' to='/doctors'>Insurance Claim</Link>
      </div>
    </div>
  </>
)
}

export default Navbar