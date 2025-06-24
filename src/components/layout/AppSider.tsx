import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Image from 'next/image';

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const items: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `Subnav ${key}`,
    children: Array.from({ length: 4 }).map((_, j) => ({
      key: `${index * 4 + j + 1}`,
      label: `Option ${index * 4 + j + 1}`,
    })),
  };
});

const AppSider: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      width={250}
      collapsible
      trigger={null}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      style={{ backgroundColor: colorBgContainer }}
    >
      <div style={{ height: 64, margin: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          src="/assets/20250613_1327_Coruja Lâmpada Criativa_remix_01jxn1sysdeqfa5xskp7ae1jtw.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        items={items}
        style={{ flex: 1, borderRight: 0, backgroundColor: colorBgContainer }}
      />
    </Sider>
  );
};

export default AppSider;
