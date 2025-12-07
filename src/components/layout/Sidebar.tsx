import { ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import { TSidebarItem } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
const { Sider } = Layout; 

const Sidebar = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    }; 

        const sidebarItemsGenerator = (items: TSidebarItem[]): MenuProps['items'] => {
        return items.map((item) => {
            if (item.children) {
                return {
                    key: item.key,
                    icon: item.icon,
                    label: item.label,
                    children: item.children.map((child) => ({
                        key: `/${child.path}`, 
                        icon: child.icon,
                        label: <Link to={`/${child.path}`}>{child.label}</Link>,
                    })),
                };
            }

            return {
                key: `/${item.path}`,
                icon: item.icon,
                label: <Link to={`/${item.path}`}>{item.label}</Link>,
            };
        });
    }; 

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: '#414446',
                },
                components: {
                    Menu: {
                        itemActiveBg: '#82968D',
                        itemSelectedColor: '#fff',
                        itemBorderRadius: '10px 10px 10px 10px' as any,
                        itemHeight: 45,
                        itemMarginBlock: 12,
                        itemSelectedBg: '#82968D',
                    },
                },
            }}
        >
            <Sider
                width={250}
                theme="light"
                breakpoint="lg"
                collapsedWidth="0"
            >
                {/* logo of the website */}
                <Link to="/">
                    <div
                        style={{
                            margin: '0 20px',
                            padding: '20px 0',
                        }}
                        className=' flex items-center justify-center'
                    >
                        <img src="/logo.png" alt="" className=' w-[100px] h-[100px] ' />
                    </div>
                </Link>

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    openKeys={openKeys}
                    onOpenChange={handleOpenChange}
                    items={sidebarItemsGenerator(sidebarItems)}
                />
            </Sider>
        </ConfigProvider>
    );
};

export default Sidebar;
