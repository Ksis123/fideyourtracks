import React from 'react'
import "./DefaultLayout.css"
import Navbar from './Navbar'
function DefaultLayout({ children }) {

    return (
        <div className="main bg-[#ffffff9e]">
            <div className='bg-[#1b1b1bf3]'>
                <Navbar/>
                {/* 252525 */}
            </div>
            <div className="content m-12 p-5 ">
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout