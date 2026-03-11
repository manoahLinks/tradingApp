import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { HiEnvelope, HiOutlineExclamationTriangle } from 'react-icons/hi2';
import Loader from "../components/Loader/Loader";

const API_BASE = 'https://trading-api-orcin.vercel.app/api/v1/users';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            return;
        }

        setIsLoading(false);
        navigate('/reset-password', { state: { email } });
    };

    return (
        <div className="flex text-white flex-col md:w-4/12 w-full m-auto rounded-lg bg-[#18203A] bg-opacity-90 md:p-5 p-3">
            <form className="flex flex-col md:gap-y-6 gap-y-4" onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <Logo text={false} />
                </div>
                <h4 className="text-[20px] text-center text-orange-500 font-bold">Forgot Password</h4>
                {error && (
                    <div className="p-2 flex gap-x-2 bg-red-200 border items-center rounded-md border-red-400 text-red-800">
                        <HiOutlineExclamationTriangle />
                        <small>{error}</small>
                    </div>
                )}
                <span className="font-light text-xs">
                    Enter your email address and we'll send you a code to reset your password.
                </span>
                <div className="flex flex-col gap-y-4 md:gap-y-4">
                    <label>Email address</label>
                    <div className="flex relative items-center">
                        <HiEnvelope className="ml-2" />
                        <input
                            type="email"
                            placeholder="eg. example@gmail.com"
                            className="placeholder-slate-300 absolute px-8 bg-[#18203A] opacity-50 w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-2 border-transparent rounded-md text-white p-2">
                    Send Reset Code
                </button>

                <Link className="text-center text-blue-400 text-sm" to="/login">Back to Login</Link>
            </form>
            {isLoading && <Loader />}
        </div>
    );
};

export default ForgotPassword;
