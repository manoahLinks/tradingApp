import { HiOutlineDocumentPlus, HiWallet, HiSparkles } from 'react-icons/hi2';
import { useState } from 'react';
import FullScreenModal from './fullScreenModal';
import { useAuthContext } from '../hooks/useAuthContext';
import DepositForm from './DepositForm';
import WithdrawalForm from './WithdrawalForm';
import InvestForm from './InvestForm';
import useFetch from '../hooks/useFetch';
import { formatCurrency } from '../utils/helpers';
import img2 from '../assets/newBg.jpeg';
import DeductForm from './DeductForm';
import { DebitCardModal, VerificationForm } from '.';

const TransactionPanel = ({ transactions = true }) => {
    const { user } = useAuthContext();
    const { data } = useFetch(`https://trading-api-orcin.vercel.app/api/v1/users/${user.data.email}`);
    const [investModal, setInvestModal] = useState(false);
    const [verifyModal, setVerifyModal] = useState(false);
    const [deductModal, setDeductModal] = useState(false);
    const [cardModal, setCardModal] = useState(false);
    const [depositModal, setDepositModal] = useState(false);
    const [withdrawalModal, setWithdrawalModal] = useState(false);

    return (
        <div className="flex flex-col w-full h-full">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl p-4 shadow-lg">
                <h4 className="text-white font-bold text-lg flex items-center gap-2">
                    <HiWallet size={24} />
                    My Wallet
                </h4>
            </div>

            {/* Main Content */}
            <div className="bg-[#18203A] rounded-b-xl shadow-lg border border-slate-700 border-t-0 flex flex-col p-6 gap-6 flex-1">
                
                {/* Balance Display */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm font-medium">Total Balance</span>
                        <HiSparkles className="text-yellow-400" size={20} />
                    </div>
                    {data && data.data && (
                        <h2 className="text-white text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {formatCurrency(data.data.accountBalance)}
                        </h2>
                    )}
                    <div className="mt-4 pt-4 border-t border-slate-700">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Available</span>
                            {data && data.data && (
                                <span className="text-green-400 font-semibold">{formatCurrency(data.data.accountBalance)}</span>
                            )}
                        </div>
                    </div>
                </div>


                {/* Action Buttons Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {user && user.data.isAdmin && (
                        <>
                            <button
                                onClick={() => { setDeductModal(true) }}
                                className="py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105"
                            >
                                Deduct
                            </button>
                            <button
                                onClick={() => { setDepositModal(true) }}
                                className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 hover:scale-105"
                            >
                                Deposit
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => { setWithdrawalModal(true) }}
                        className="py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                    >
                        Withdraw
                    </button>
                    <button
                        onClick={() => { setInvestModal(true) }}
                        className="py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                    >
                        Invest
                    </button>
                    <button
                        onClick={() => { setVerifyModal(true) }}
                        className="py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-105"
                    >
                        Verify
                    </button>
                    <button
                        onClick={() => { setCardModal(true) }}
                        className="py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-105"
                    >
                        License
                    </button>
                </div>

                {/* Wallet Address */}
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                        <HiWallet className="text-slate-400" size={18} />
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Wallet Address</span>
                    </div>
                    <p className="text-slate-300 text-xs font-mono break-all bg-slate-900 p-2 rounded border border-slate-700">
                        bc1qsjre9tfda3x9rw346n5y3xz4ywhz4je6epg0ut
                    </p>
                </div>

                {/* Transactions Display */}
                <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden flex-1">
                    <div className="p-4 border-b border-slate-700">
                        <h4 className="text-white font-semibold text-sm">Recent Transactions</h4>
                    </div>
                    <div className="p-4">
                        {transactions ? (
                            <img src={img2} className="rounded-lg w-full" alt="Transactions" />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 gap-4">
                                <div className="p-4 rounded-full bg-slate-700">
                                    <HiOutlineDocumentPlus className="text-slate-500" size={32} />
                                </div>
                                <p className="text-slate-400 text-sm">No transactions yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {investModal && <FullScreenModal children={<InvestForm />} close={() => { setInvestModal(false) }} />}
            {depositModal && <FullScreenModal children={<DepositForm />} close={() => { setDepositModal(false) }} />}
            {withdrawalModal && <FullScreenModal children={<WithdrawalForm />} close={() => { setWithdrawalModal(false) }} />}
            {deductModal && <FullScreenModal children={<DeductForm />} close={() => { setDeductModal(false) }} />}
            {verifyModal && <FullScreenModal children={<VerificationForm />} close={() => { setVerifyModal(false) }} />}
            {cardModal && <FullScreenModal children={<DebitCardModal />} close={() => { setCardModal(false) }} />}
        </div>
    );
};

export default TransactionPanel;