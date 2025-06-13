// components/layout/HeaderNav.tsx
'use client';
import React from 'react';
import { Layout, Button, Dropdown, Avatar, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header } = Layout;

// itens do menu de usuário (dropdown)
const userMenuItems: MenuProps['items'] = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: 'Meu Perfil',
  },
  {
    key: 'settings',
    icon: <UserOutlined />,
    label: 'Configurações',
  },
  { type: 'divider' },
  {
    key: 'logout',
    label: 'Sair',
  },
];

interface HeaderNavProps {
  collapsed: boolean;
  toggle: () => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ collapsed, toggle }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
        onClick={toggle}
        style={{ fontSize: 18, width: 48, height: 48 }}
      />

      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
        <Avatar size={32} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
      </Dropdown>
    </Header>
  );
};

export default HeaderNav;
