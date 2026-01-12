import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';
import axiosInstance from '../../../utils/axiosInstance';

const { Option } = Select;

const UserChart = () => {
    interface UserData {
        month: string;
        totalUsers: number;
        newUsers: number;
    }

    const [data, setData] = useState<UserData[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('2025');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Arabic Month Names
    const monthNames = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    const fetchUserStatistics = async (year: string) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axiosInstance.get(`/user/app-ids-statistics`, {
                params: { year }
            });

            if (response.data.success) {
                const statistics = response.data.data.statistics;
                
                const transformedData: UserData[] = statistics.map((item: any) => ({
                    month: monthNames[item.month - 1], // Maps number to Arabic name
                    totalUsers: item.yearToDateTotal || 0,
                    newUsers: item.monthlyCount || 0
                }));

                setData(transformedData);
            } else {
                setError('فشل تحميل الإحصائيات');
            }
        } catch (err: any) {
            // Generate empty data with Arabic months if error occurs
            const emptyData: UserData[] = monthNames.map((month) => ({
                month,
                totalUsers: 0,
                newUsers: 0
            }));
            setData(emptyData);
            console.error('Error fetching user statistics:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserStatistics(selectedYear);
    }, [selectedYear]);

    const handleYearChange = (value: string) => {
        setSelectedYear(value);
    };

    return (
        <div
            dir="rtl"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                fontFamily: "'Traditional Arabic', 'Amiri', serif"
            }}
        >
            {/* Header Section */}
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-bold text-primary">نشاط المستخدمين</h1>
                <Select 
                    value={selectedYear} 
                    onChange={handleYearChange}
                    className="w-32 h-[40px]"
                    disabled={loading}
                    style={{ fontFamily: "inherit" }}
                >
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                    <Option value="2027">2027</Option>
                    <Option value="2028">2028</Option>
                    <Option value="2029">2029</Option>
                    <Option value="2030">2030</Option>
                </Select>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center h-[600px]">
                    <p className="text-gray-500">جاري التحميل...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="px-2 py-2">
                    <p className="text-red-500 text-sm">{error}</p>
                </div>
            )}

            {/* Chart Section */}
            {!loading && (
                <div style={{ direction: 'ltr' }}> 
                {/* Note: We keep the Chart container LTR internally so the X-Axis 
                   flows Jan -> Dec correctly left-to-right (standard for graphs), 
                   but the labels and tooltips will be Arabic.
                   We move the Y-Axis to the right to simulate RTL feel.
                */}
                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            
                            <XAxis 
                                dataKey="month" 
                                tick={{ fontSize: 14, fontFamily: "'Traditional Arabic', serif" }}
                            />
                            
                            <YAxis 
                                orientation="right"  // Moves numbers to the right side
                                tick={{ fontSize: 14 }}
                            />
                            
                            <Tooltip 
                                contentStyle={{ 
                                    direction: 'rtl', 
                                    textAlign: 'right', 
                                    fontFamily: "'Traditional Arabic', serif",
                                    borderRadius: '8px'
                                }}
                            />
                            
                            <Legend 
                                wrapperStyle={{ fontFamily: "'Traditional Arabic', serif", paddingTop: '10px' }}
                            />
                            
                            <Bar 
                                dataKey="totalUsers" 
                                fill="#286a25" // Main Theme Green
                                name="إجمالي المستخدمين (تراكمي)" 
                                radius={[4, 4, 0, 0]}
                            />
                            
                            <Bar 
                                dataKey="newUsers" 
                                fill="#DAA520" // Gold (Secondary Color)
                                name="المستخدمين الجدد (شهري)" 
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default UserChart;