import { ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import sidebarItems from '../../utils/sidebarItems';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const parentMap: Record<string, string> = {
      '/about': 'settings',
      '/privacy': 'settings',
      '/terms': 'settings',
    };

    const parentKey = parentMap[location.pathname];
    setOpenKeys(parentKey ? [parentKey] : []);
  }, [location.pathname]);

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const sidebarItemsGenerator = (items: any[]): MenuProps['items'] =>
    items.map((item) => {
      if (item.children) {
        return {
          key: item.key, 
          icon: item.icon,
          label: item.label,
          children: item.children.map((child: any) => ({
            key: `/${child.path}`,
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

  return (
    <ConfigProvider
      theme={{
        components: {
        Menu: {
        itemActiveBg: '#82968D',
        itemSelectedBg: '#82968D', 
        itemSelectedColor: '#fff', 
        itemBorderRadius: 10,
        },
        },
      }}
    >
      <Sider width={250} theme="light">
        <Link to="/">
          <div className="flex items-center justify-center py-5">
            <img src="/logo.png" className="w-fit object-contain h-[100px]" />
          </div>
        </Link>

        <Menu
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