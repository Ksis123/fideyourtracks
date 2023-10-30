import React from 'react'
import "./DefaultLayout.css"
import Navbar from './Navbar'
function DefaultLayout({ children }) {

    return (
        <div className="main them ">
            <div className='bg-[#1b1919f3] drop-shadow-2xl'>
                <Navbar />
            </div>
            <div className="content p-5 ">
                {children}
            </div>
        </div>

    )
}

export default DefaultLayout