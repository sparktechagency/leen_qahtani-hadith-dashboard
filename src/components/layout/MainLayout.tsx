import React from 'react';

import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderDashboard from './HeaderDashboard';
import Sidebar from './Sidebar';

const { Content } = Layout;

const MainLayout: React.FC = () => {
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout
            style={{
                height: '100vh',
            }}
        >
            <Sidebar />
            <Layout>
                {/* header */}

                <HeaderDashboard />
                <Content style={{ margin: 10 }} className='overflow-y-scroll' >
                    <div
                        style={{
                            padding: 0,
                            minHeight: '50vh',
                            width: '100%',
                            background: '#F6F6F6',
                            borderRadius: borderRadiusLG,
                        }} 
                        className=''
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
