import React, { useEffect } from 'react'
import { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { paginateTapel } from '../features/dashboard/TapelSlice';

const Paginate = ({ items }) => {
    const dispatch = useDispatch();

    const paginateAction = (pageLink) => {
        if (pageLink !== null) {
            dispatch(paginateTapel(pageLink));
        }
    }

    return (
        <div className="flex justify-end my-5 mx-5 text-indigo-900 font-bold">
            <div className="flex bg-white rounded-lg">
                {
                    items?.items?.links.map((link, i) => (
                        <div key={i} className='font-bold'>
                            {link?.label === 'Sebelumnya' && (
                                <button onClick={() => paginateAction(link?.url)} className={`border-2 duration-300 border-indigo-600 h-12 w-12 rounded-l-lg hover:bg-indigo-600 hover:text-white ${link?.active && 'bg-indigo-600 text-white'}`}>
                                    <MdKeyboardArrowLeft className='mx-auto text-2xl' />
                                </button>
                            )}
                            {link?.url && link?.label !== 'Sebelumnya' && link?.label !== 'Berikutnya' && (
                                <button onClick={() => paginateAction(link?.url)} className={`border-2 h-12 w-12 duration-300 border-indigo-600 hover:bg-indigo-600 hover:text-white border-l-0 ${link?.active && 'bg-indigo-600 text-white'}`}>
                                    {link?.label}
                                </button>
                            )}
                            {link?.label === 'Berikutnya' && (
                                <button onClick={() => paginateAction(link?.url)} className={`border-2 border-indigo-600 h-12 w-12 duration-300 hover:bg-indigo-600 hover:text-white border-l-0 rounded-r-lg ${link?.active && 'bg-indigo-600 text-white'}`}>
                                    <MdKeyboardArrowRight className='mx-auto text-2xl' />
                                </button>
                            )}
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default Paginate