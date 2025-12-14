import React, { useEffect, useState } from 'react';
import { ConfigProvider, Tabs, Spin } from 'antd';
import type { TabsProps } from 'antd';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import axiosInstance from '../../../utils/axiosInstance';
const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get('/user/profile');
            setUser(res.data.data);
        } catch (err) {
            console.log('Error loading profile:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Edit Profile`,
            children: <EditProfile user={user} reload={fetchProfile} />,
        },
        {
            key: '2',
            label: `Change Password`,
            children: <ChangePassword />,
        },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#2563EB',
                },
            }}
        >
            <div className="p-6 bg-white rounded-lg shadow-md">
                {loading ? <Spin /> : <Tabs defaultActiveKey="1" items={items} />}
            </div>
        </ConfigProvider>
    );
};

export default Profile;