import { TransactionPanel } from '../components';
import { useAuthContext } from '../hooks/useAuthContext';
import useFetch from '../hooks/useFetch';
import { formatCurrency } from '../utils/helpers';
import { HiArrowTrendingUp, HiWallet, HiCurrencyDollar, HiChartBar } from 'react-icons/hi2';

const Dashboard = () => {
    const { user } = useAuthContext();
    const { data } = useFetch(`https://trading-api-orcin.vercel.app/api/v1/users/${user.data.email}`);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 h-full">
            {/* Welcome Header - Full Width */}
            <div className="lg:col-span-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-white text-2xl font-bold mb-1">
                            Welcome back, {user && <span className="capitalize">{user.data.email.split('@')[0]}</span>}
                        </h2>
                        <p className="text-blue-100 text-sm">Here's what's happening with your portfolio today</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <HiWallet className="text-white" size={24} />
                        <div className="text-white">
                            <p className="text-xs opacity-80">Total Balance</p>
                            {data && data.data && (
                                <p className="text-xl font-bold">{formatCurrency(data.data.accountBalance)}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats - 3 Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Available Balance Card */}
                <div className="bg-[#18203A] rounded-xl p-6 shadow-lg border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-500 bg-opacity-20 rounded-lg">
                            <HiCurrencyDollar className="text-blue-400" size={24} />
                        </div>
                        <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                            <HiArrowTrendingUp size={16} />
                            +2.5%
                        </span>
                    </div>
                    <h3 className="text-slate-400 text-sm mb-1">Available Balance</h3>
                    {data && data.data && (
                        <p className="text-white text-2xl font-bold">{formatCurrency(data.data.accountBalance)}</p>
                    )}
                </div>

                {/* Total Invested Card */}
                <div className="bg-[#18203A] rounded-xl p-6 shadow-lg border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-purple-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-500 bg-opacity-20 rounded-lg">
                            <HiChartBar className="text-purple-400" size={24} />
                        </div>
                        <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                            <HiArrowTrendingUp size={16} />
                            +12.3%
                        </span>
                    </div>
                    <h3 className="text-slate-400 text-sm mb-1">Total Invested</h3>
                    <p className="text-white text-2xl font-bold">$0.00</p>
                </div>

                {/* Total Profit Card */}
                <div className="bg-[#18203A] rounded-xl p-6 shadow-lg border border-slate-700 hover:border-pink-500 transition-all duration-300 hover:shadow-pink-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-pink-500 bg-opacity-20 rounded-lg">
                            <HiArrowTrendingUp className="text-pink-400" size={24} />
                        </div>
                        <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                            <HiArrowTrendingUp size={16} />
                            +8.7%
                        </span>
                    </div>
                    <h3 className="text-slate-400 text-sm mb-1">Total Profit</h3>
                    <p className="text-white text-2xl font-bold">$0.00</p>
                </div>
            </div>

            {/* Transaction Panel - Right Sidebar */}
            <div className="lg:col-span-4 lg:row-span-2">
                <TransactionPanel />
            </div>

            {/* Recent Activity Section */}
            <div className="lg:col-span-8 bg-[#18203A] rounded-xl p-6 shadow-lg border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white text-lg font-semibold">Recent Activity</h3>
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                        View All
                    </button>
                </div>
                
                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="p-4 bg-slate-800 rounded-full mb-4">
                        <HiChartBar className="text-slate-600" size={32} />
                    </div>
                    <h4 className="text-slate-400 text-lg font-medium mb-2">No Recent Activity</h4>
                    <p className="text-slate-500 text-sm text-center max-w-md">
                        Your recent transactions and activities will appear here. Start investing to see your portfolio grow!
                    </p>
                </div>
            </div>

            {/* Quick Actions - Bottom Banner */}
            <div className="lg:col-span-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 shadow-lg border border-slate-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-white font-semibold mb-1">Ready to grow your portfolio?</h3>
                        <p className="text-slate-400 text-sm">Leverage the power of the lightning network and get credited anywhere!</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 whitespace-nowrap">
                            Start Investing
                        </button>
                        <button className="px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all duration-300 whitespace-nowrap">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;