import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const [active, setActive] = useState(null)
  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <div className='font-semibold text-white w-[6vw] h-100 bg-blue py-[8rem] flex flex-col justify-between items-center'>
      <div className='flex flex-col gap-[3rem]'>
        <Link to='/' className={`${active === '/' ? 'text-pink' : ''}`}>World</Link>
        <Link to='/usa' className={`${active === '/usa' ? 'text-pink' : ''}`}>United<br/>States</Link>
        {/* <Link to='/usa/abortions' className='font-normal'>abortions</Link>
        <Link to='/usa/clinics' className='font-normal'>clinics</Link> */}
      </div>
      <Link to='/'>About</Link>
    </div>
  )
}

export default NavBar;