import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import {HiEnvelope, HiLockClosed, HiOutlineExclamationTriangle} from 'react-icons/hi2';
import {FaXTwitter, FaDiscord} from 'react-icons/fa6'
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import Loader from "./Loader/Loader";

const FormContainer = ({page="signup"}) => {

    const {signup, isLoading: signupLoading, error: signupError} = useSignup()
    const {login, isLoading: loginLoading, error: loginError} = useLogin()
    const Navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const inputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {email, password} = formData
        
        if(page == 'signup') {
            const user = await signup(email, password)

            if(user) {
                Navigate(`/dashboard`)
            }
            
        }

        else if(page == 'Login') {
            const user = await login(email, password)
            if(user) {
                Navigate(`/dashboard`)
            }
        }
    }
    
    return ( 
        <div className="flex text-white flex-col md:w-4/12 w-full m-auto rounded-lg bg-[#18203A] bg-opacity-90 md:p-5 p-3">
            <form className="flex flex-col md:gap-y-6 gap-y-4" onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <Logo text={false}/>
                </div>
                <h4 className="text-[20px] text-center text-orange-500 font-bold">{page}</h4>
                {
                    (signupError || loginError) && (
                        <div className="p-2 flex gap-x-2 bg-red-200 border items-center rounded-md border-red-400 text-red-800">
                            <HiOutlineExclamationTriangle/>
                            <small>{signupError || loginError}</small>
                        </div>
                    )
                }
                <span className="font-light text-xs">
                    Hi 👋, its easy getting started lets help you experience the magic 
                </span>
                <div className="flex flex-col gap-y-4 md:gap-y-4">
                    <label htmlFor="">Email address</label>
                    <div className="flex relative items-center">
                        <HiEnvelope className="ml-2"/>
                        <input 
                            type="email"
                            placeholder="eg. example@gmail.com"
                            className="placeholder-slate-300 absolute px-8 bg-[#18203A] opacity-50 w-full"
                            name="email"
                            value={formData.email}
                            onChange={inputChange}
                        />
                    </div>
                    
                </div>

                <div className="flex flex-col gap-y-4 md:gap-y-4">
                    <label htmlFor="">Password</label>
                    <div className="flex relative items-center">
                        <HiLockClosed className="ml-2"/>
                        <input 
                            type="password"
                            placeholder="strong password"
                            className="placeholder-slate-300 absolute px-8 bg-[#18203A] opacity-50 w-full"
                            name="password"
                            value={formData.password}
                            onChange={inputChange}
                        />
                    </div>        
                </div>

                <Link className="text-right text-blue-400" to={``}>forgot password ?</Link>

                <button class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-2 border-transparent rounded-md text-white p-2">
                    {page}
                </button>

                <hr />

                <div className="flex items-center gap-x-4">
                    <input type="checkbox" name="" id="" />
                    <small className="font-light text-xs text-center">Terms and conditions Instantchain @2023</small>
                </div>
                <div className="grid grid-cols-4 ">
                    <FaXTwitter/>
                    <FaDiscord/>
                </div>
            </form>
            {!loginError && loginLoading && <Loader/>  || !signupError && signupLoading && <Loader/>}
            {/* {loginError && <h4>{loginError}</h4>} */}
        </div>
     );
}
 
export default FormContainer;