// src/components/layout/AppHeader.tsx
'use client';

import React from 'react';
import { Layout, Button, Avatar, Dropdown, theme, MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Header } = Layout;

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function AppHeader({ collapsed, setCollapsed }: Props) {
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: 'Meu Perfil' },
    { key: 'settings', icon: <LaptopOutlined />, label: 'Configurações' },
    { type: 'divider' },
    { key: 'logout', label: 'Sair' },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'profile':
        router.push('/profile');
        break;
      case 'settings':
        router.push('/settings');  
        break;
      case 'logout':
        break;
      default:
        break;
    }
  };

  return (
    <Header
      style={{
        background: colorBgContainer,
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{ fontSize: 18, width: 48, height: 48 }}
      />

      <Dropdown
        menu={{ items: userMenuItems, onClick: handleMenuClick }}
        placement="bottomRight"
        arrow
      >
        <Avatar size={32} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
      </Dropdown>
    </Header>
  );
}
