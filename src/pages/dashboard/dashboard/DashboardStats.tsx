import { HiCurrencyDollar, HiMiniUserGroup } from 'react-icons/hi2';
import { IoBookmarks } from 'react-icons/io5';

const DashboardStats = () => {
    const data = [
        {
            name: 'إجمالي المستخدمين', // Total User
            count: '20.10K',
            icon: <HiMiniUserGroup color="#286a25" size={35} />,
            bgColor: '#fff',
            textColor: '#286a25',
        },
        {
            name: 'إجمالي الأرباح', // Total Earning
            count: '920',
            icon: <HiCurrencyDollar color="#286a25" size={36} />,
            textColor: '#3F0D47',
            bgColor: '#fff',
        },
        {
            name: 'إجمالي المحفوظات', // Total Bookmarks (based on icon)
            count: '150.10K',
            icon: <IoBookmarks color="#286a25" size={30} />,
            textColor: '#DAA520',
            bgColor: '#fff',
        },
    ];

    return (
        <div dir="rtl">
            <div className="grid grid-cols-3 gap-8 items-center">
                {data.map((item, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-md rounded-xl p-8 border flex items-center gap-3 transition-transform hover:scale-105"
                    >
                        {/* Icon Container */}
                        <div className="rounded-full flex items-center justify-center bg-green-50 w-16 h-16">
                            {item?.icon}
                        </div>
                        
                        {/* Text Container */}
                        <div className="flex-1 flex justify-between items-center">
                            <p 
                                className="flex items-center justify-center text-lg text-[#242424] font-medium"
                                style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif", fontSize: '20px' }}
                            >
                                {item.name}
                            </p>
                            <div>
                                <p
                                    style={{ color: item.textColor }}
                                    className="text-3xl font-bold"
                                >
                                    {item.count} <span className="text-xl">+</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;