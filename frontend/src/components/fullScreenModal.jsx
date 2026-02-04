import { HiOutlineXMark } from 'react-icons/hi2';

const FullScreenModal = ({ close, children }) => {
    return (
        <div className="inset-0 fixed w-full h-screen bg-black bg-opacity-75 flex z-50 backdrop-blur-sm animate-fadeIn">
            <div className="flex flex-col md:w-5/12 lg:w-4/12 w-11/12 max-h-[90vh] p-6 rounded-2xl m-auto gap-y-4 bg-gradient-to-br from-[#18203A] to-[#0A0A0B] border border-slate-700 shadow-2xl animate-slideUp overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                    <h3 className="text-white font-semibold text-lg">Transaction</h3>
                    <button
                        onClick={close}
                        className="p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-all duration-300 group"
                    >
                        <HiOutlineXMark size={24} className="text-red-500 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FullScreenModal;