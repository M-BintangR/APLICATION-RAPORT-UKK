import React from 'react'

const Alert = ({ pesan }) => {
    return (
        <div className={`fixed  z-50 bottom-0 right-0 my-5 rounded-md mx-5 p-2 md:p-3 bg-green-600 flex flex-col justify-between duration-300 `}>
            <div className="text-sm md:text-lg font-semibold text-white">{pesan}</div>
        </div>
    )
}

export default Alert