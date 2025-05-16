import React, { useState } from 'react'
import Loader from "./Loader/Loader";
import { toast } from 'react-toastify';

function debitCard() {

    const [isPending, setIsPending] = useState(false)


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

        const response = await fetch(`http://localhost:6500/api/v1/cards/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: formData.name, address: formData.address, ssn: formData.ssn, phone: formData.phone, wallet: formData.wallet})
        })

        const json = await response.json()

        if(!response.ok){
            setIsPending(false)
            toast.error(json.error)
        }

        if(response.ok){
            setIsPending(false)
            toast.success(``)
        }

    }


  return (
    <div className="grid grid-cols-1">
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 text-white">

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
                    type="text"
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
        
        <button type="submit" className="p-2 bg-blue-500 w-full text-white shadow shadow-white">
            Order
        </button>
    </form>
    {isPending && <Loader/>}
    </div>
    
  )
}

export default debitCard