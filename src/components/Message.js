import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { BiError, BiErrorCircle } from 'react-icons/bi'
import { AiOutlineCheckCircle, AiOutlineQuestionCircle } from 'react-icons/ai'

const Message = ({ type, pesan }) => {
    const [warna, setWarna] = useState('');
    const [warnaTeks, setWarnaTeks] = useState('');

    useEffect(() => {
        if (type === 'error') {
            setWarna('border-red-500');
            setWarnaTeks('text-red-500');
        } else if (type === 'warning') {
            setWarna('border-amber-500');
            setWarnaTeks('text-amber-500');
        } else if (type === 'success') {
            setWarna('border-green-500');
            setWarnaTeks('text-green-500');
        } else {
            setWarna('border-blue-500');
            setWarnaTeks('text-blue-500');
        }
    }, [type]);

    return (
        <div>
            {type && (
                <div className={`bg-slate-50 border-l-4 ${warna} mb-5 px-5 py-3`}>
                    {type === 'error' && (
                        <>
                            <BiErrorCircle className={`text-2xl ${warnaTeks} inline mr-1`} />
                            <span className={`text-sm md:text-md ${warnaTeks}`}>{pesan}</span>
                        </>
                    )}
                    {type === 'success' && (
                        <>
                            <AiOutlineCheckCircle className={`text-2xl ${warnaTeks} inline mr-1`} />
                            <span className={`text-sm md:text-md ${warnaTeks}`}>{pesan}</span>
                        </>
                    )}
                    {type === 'warning' && (
                        <>
                            <BiError className={`text-2xl ${warnaTeks} inline mr-1`} />
                            <span className={`text-sm md:text-md ${warnaTeks}`}>{pesan}</span>
                        </>
                    )}
                    {type === 'info' && (
                        <>
                            <AiOutlineQuestionCircle className={`text-2xl ${warnaTeks} inline mr-1`} />
                            <span className={`text-sm md:text-md ${warnaTeks}`}>{pesan}</span>
                        </>
                    )}


                </div>
            )}
        </div>
    )
}

export default Message