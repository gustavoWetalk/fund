'use client';
import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Image from 'next/image';

const { Sider } = Layout;

const items: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `Subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => ({
        key: String(index * 4 + j + 1),
        label: `Option ${index * 4 + j + 1}`,
      })),
    };
  }
);

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => (
  <Sider trigger={null} collapsible collapsed={collapsed}>
    <div style={{ textAlign: 'center', padding: '16px 0' }}>
      <Image
        src="/assets/20250613_1327_Coruja_Lâmpada_Criativa.png"
        alt="Logo"
        width={collapsed ? 40 : 100}
        height={collapsed ? 40 : 100}
      />
    </div>
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      items={items}
      style={{ height: '100%', borderRight: 0 }}
    />
  </Sider>
);

export default Sidebar;
