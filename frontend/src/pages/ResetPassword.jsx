import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { HiLockClosed, HiOutlineExclamationTriangle } from 'react-icons/hi2';
import Loader from "../components/Loader/Loader";

const API_BASE = 'https://trading-api-orcin.vercel.app/api/v1/users';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailFromState = location.state?.email || '';

    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        const response = await fetch(`${API_BASE}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailFromState, resetCode, newPassword })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            return;
        }

        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
    };

    if (!emailFromState) {
        return (
            <div className="flex text-white flex-col md:w-4/12 w-full m-auto rounded-lg bg-[#18203A] bg-opacity-90 md:p-5 p-3 text-center gap-y-4">
                <h4 className="text-[20px] text-orange-500 font-bold">No Email Provided</h4>
                <p className="text-sm">Please start from the forgot password page.</p>
                <Link className="text-blue-400" to="/forgot-password">Go to Forgot Password</Link>
            </div>
        );
    }

    return (
        <div className="flex text-white flex-col md:w-4/12 w-full m-auto rounded-lg bg-[#18203A] bg-opacity-90 md:p-5 p-3">
            <form className="flex flex-col md:gap-y-6 gap-y-4" onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <Logo text={false} />
                </div>
                <h4 className="text-[20px] text-center text-orange-500 font-bold">Reset Password</h4>

                {error && (
                    <div className="p-2 flex gap-x-2 bg-red-200 border items-center rounded-md border-red-400 text-red-800">
                        <HiOutlineExclamationTriangle />
                        <small>{error}</small>
                    </div>
                )}

                {success && (
                    <div className="p-2 bg-green-200 border rounded-md border-green-400 text-green-800 text-center">
                        <small>Password reset successful! Redirecting to login...</small>
                    </div>
                )}

                <span className="font-light text-xs">
                    Enter the 5-digit code sent to <span className="text-purple-400">{emailFromState}</span> and your new password.
                </span>

                <div className="flex flex-col gap-y-4 md:gap-y-4">
                    <label>Reset Code</label>
                    <input
                        type="text"
                        placeholder="Enter 5-digit code"
                        className="placeholder-slate-300 px-4 py-2 bg-[#18203A] opacity-50 w-full rounded-md border border-slate-600"
                        maxLength="5"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-y-4 md:gap-y-4">
                    <label>New Password</label>
                    <div className="flex relative items-center">
                        <HiLockClosed className="ml-2" />
                        <input
                            type="password"
                            placeholder="New password (min 8 characters)"
                            className="placeholder-slate-300 absolute px-8 bg-[#18203A] opacity-50 w-full"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-y-4 md:gap-y-4">
                    <label>Confirm Password</label>
                    <div className="flex relative items-center">
                        <HiLockClosed className="ml-2" />
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="placeholder-slate-300 absolute px-8 bg-[#18203A] opacity-50 w-full"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-2 border-transparent rounded-md text-white p-2">
                    Reset Password
                </button>

                <Link className="text-center text-blue-400 text-sm" to="/forgot-password">Resend code</Link>
            </form>
            {isLoading && <Loader />}
        </div>
    );
};

export default ResetPassword;
