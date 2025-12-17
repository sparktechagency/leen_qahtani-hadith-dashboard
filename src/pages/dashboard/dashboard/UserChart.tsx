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

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
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
                    month: monthNames[item.month - 1],
                    totalUsers: item.yearToDateTotal || 0,
                    newUsers: item.monthlyCount || 0
                }));

                setData(transformedData);
            } else {
                setError('Failed to fetch statistics');
            }
        } catch (err: any) {
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
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-medium">User Activities</h1>
                <Select 
                    value={selectedYear} 
                    onChange={handleYearChange}
                    className="w-32 h-[40px]"
                    disabled={loading}
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

            {loading && (
                <div className="flex items-center justify-center h-[600px]">
                    <p className="text-gray-500">Loading...</p>
                </div>
            )}

            {error && (
                <div className="px-2 py-2">
                    <p className="text-red-500 text-sm">{error}</p>
                </div>
            )}

            {!loading && (
                <ResponsiveContainer width="100%" height={600}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalUsers" fill="#82968D" name="Total Users (YTD)" />
                        <Bar dataKey="newUsers" fill="#ffc09cff" name="New Users (Monthly)" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default UserChart;