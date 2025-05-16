import {HiOutlineDocumentPlus, HiWallet} from 'react-icons/hi2';
import img from '../assets/bitcoin1.png';
import { useEffect, useState } from 'react';
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


const TransactionPanel = ({transactions=true}) => {
    const {user} = useAuthContext()
    const {data} = useFetch(`https://trading-api-orcin.vercel.app/api/v1/users/${user.data.email}`)
    const [investModal, setInvestModal] = useState(false)
    const [verifyModal, setVerifyModal] = useState(false)
    const [deductModal, setDeductModal] = useState(false)
    const [cardModal, setCardModal] = useState(false)
    const [depositModal, setDepositModal] = useState(false)
    const [withdrawalModal, setWithdrawalModal] = useState(false)

    return ( 
        <div className="flex flex-col w-full">
            <h4 className='text-slate-400 p-2 w-full font-semibold text-center md:flex md:text-sm'>My Wallet</h4>
            
            <div className="border-slate-50 rounded bg-[#18203A] flex flex-col p-5 items-center gap-y-4">
                <div className='auto rounded-full flex gap-x-2 p-2 bg-slate-300 '>
                    <button className='bg-slate-400 rounded-lg text-slate-100 px-2'>withdrawals</button>
                    <button className='bg-purple-400 font-bold text-purple-100 rounded-lg px-2'>Stake</button>
                </div>

                <div className=' p-5 rounded-full flex flex-col border-slate-400 '>
                    
                    <span className='font-bold my-auto  mx-auto flex flex-col gap-y-2'>
                        <small className='mx-auto text-white gradient-text'>Total Balance</small>    
                        {data && data.data && <h4 className='text-[15px] font-bold text-slate-100'>{formatCurrency(data.data.accountBalance)}</h4>}
                    </span>
                </div>

                <div className='p-3 bg-black rounded-md grid grid-cols-2 text-xs gap-4'>
                    {user && user.data.isAdmin && <button onClick={()=>{setDeductModal(true)}} className='p-2 text-white rounded-md font-bold bg-[#18203A]'>Deduct</button>}
                    {user && user.data.isAdmin && <button onClick={()=>{setDepositModal(true)}} className='p-2 text-white rounded-md font-bold bg-[#18203A]'>Deposit</button>}
                    <button onClick={()=>{setWithdrawalModal(true)}} className='p-2 text-white bg-[#18203A] rounded-md font-bold'>withdraw</button>
                    <button onClick={()=>{setInvestModal(true)}} className='p-2 text-white bg-[#18203A] rounded-md font-bold'>Invest</button>
                    <button onClick={()=>{setVerifyModal(true)}} className='p-2 text-white bg-[#18203A] rounded-md font-bold'>Verify Transaction</button>
                    <button onClick={()=>{setCardModal(true)}} className='p-2 text-white bg-[#18203A] rounded-md font-bold'>License</button>
                </div>

                <span className='text-white flex flex-col text-center'>
                      <small className='flex items-center gap-x-2 text-slate-400'><HiWallet/> wallet </small>  
                    <small className='text-[10px]'>bc1qsjre9tfda3x9rw346n5y3xz4ywhz4je6epg0ut</small>
                </span>
                <div className='p-3 bg-black rounded-lg text-white'>
                    
                    {
                        transactions ?
                        (<img src={img2} className='' alt="" />)
                        :
                        (
                            <div className='flex flex-col items-center gap-y-4'>
                                <span className='p-4 rounded-full bg-[#18203A]'>
                                    <HiOutlineDocumentPlus size={30}/>
                                </span>

                                No Transaction ...
                            </div>
                        )
                    }
                </div>
            </div>    
              {investModal && <FullScreenModal children={<InvestForm/>} close={()=>{setInvestModal(false)}}/>}  
              {depositModal && <FullScreenModal children={<DepositForm/>} close={()=>{setDepositModal(false)}}/>}  
              {withdrawalModal && <FullScreenModal children={<WithdrawalForm/>} close={()=>{setWithdrawalModal(false)}}/>}  
              {deductModal && <FullScreenModal children={<DeductForm/>} close={()=>{setDeductModal(false)}}/>}  
              {verifyModal && <FullScreenModal children={<VerificationForm/>} close={()=>{setVerifyModal(false)}}/>} 
              {cardModal && <FullScreenModal children={<DebitCardModal/>} close={()=>{setCardModal(false)}}/>}  
        </div>
     );
}
 
export default TransactionPanel;