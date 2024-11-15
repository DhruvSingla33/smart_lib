import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiLogin , CiLogout } from "react-icons/ci";


function Header() {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="rounded-xl navbar-center text-center fixed top-2 w-full z-10">
        <ul className="menu menu-horizontal menu-lg py-2 my-2 bg-gray-950 rounded-2xl">
            <li>
                <a href='/' target='_parent'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </a>
            </li>

            <li>
                <a href='/problems' target='_parent'>
                <svg fill='gold' className='h-5 w-5' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 487.5 487.5" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M437,12.3C437,5.5,431.5,0,424.7,0H126.3C84.4,0,50.4,34.1,50.4,75.9v335.7c0,41.9,34.1,75.9,75.9,75.9h298.5 c6.8,0,12.3-5.5,12.3-12.3V139.6c0-6.8-5.5-12.3-12.3-12.3H126.3c-28.3,0-51.4-23.1-51.4-51.4S98,24.5,126.3,24.5h298.5 C431.5,24.5,437,19,437,12.3z M126.3,151.8h286.2V463H126.3c-28.3,0-51.4-23.1-51.4-51.4V131.7 C88.4,144.2,106.5,151.8,126.3,151.8z"></path> <path d="M130.5,64.8c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h280.1c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H130.5z"></path> <path d="M178,397.7c6.3,2.4,13.4-0.7,15.8-7.1l17.9-46.8h62.7c0.5,0,0.9-0.1,1.3-0.1l17.9,46.9c1.9,4.9,6.5,7.9,11.4,7.9 c1.5,0,2.9-0.3,4.4-0.8c6.3-2.4,9.5-9.5,7.1-15.8l-54-141.2c-3-7.9-10.4-13-18.8-13c-8.4,0-15.8,5.1-18.8,13l-54,141.2 C168.5,388.2,171.7,395.2,178,397.7z M243.7,260l22.7,59.3h-45.3L243.7,260z"></path> </g> </g> </g></svg>
                </a>
            </li>
            {isAuthenticated ? (
                <li>
                    <a href='/personalproblems' target='_parent'>
                    Problems
                    </a>
                </li>
                

            ):""}
              {isAuthenticated ? (
                <li>
                    <a href='/coding1' target='_parent'>
                    Algo
                    </a>
                </li>
                

            ):""}
            {isAuthenticated ? (
                <li>
                    <a href='/coding2' target='_parent'>
                     CodeEditor
                    </a>
                </li>
                

            ):""}
             {isAuthenticated ? (
                <li>
                    <a href='/allpost' target='_parent'>
                     Discussion
                    </a>
                </li>
                

            ):""}
              {isAuthenticated ? (
                <li>
                    <a href='/coding3' target='_parent'>
                     Tutorials
                    </a>
                </li>
                

            ):""}

            {/* <li>
                <a href='/recommendation' target='_parent'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </a>
            </li> */}
            <li>
                <a href='/contact' target='_parent'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </a>
            </li>
            {
                !isAuthenticated ? (
                    <li>
                    <a>
                        <CiLogin className='text-2xl ' onClick={() => loginWithRedirect()}/>
                        </a>
                    </li>
                ) : ""
            }
            {isAuthenticated ? (
                <li>
                    <a href='/' target='_parent'>
                        <CiLogout className='text-2xl' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} />
                    </a>
                </li>
                

            ):""}
            {isAuthenticated ? (
                <li>
                    <a href='/profile' target='_parent'>
                        <CgProfile className='text-2xl '/>
                    </a>
                </li>
                

            ):""}
          
            {/* <li>{
                isAuthenticated ? (
                    
                ) : 
                ""
            }
                
            </li>
            <li>{
                isAuthenticated ? (
                    
                ) :
                null
            }
                
            </li> */}
        </ul>
    </div>
  )
}

export default Header