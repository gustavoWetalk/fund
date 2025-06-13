'use client';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Avatar, Dropdown, theme, Breadcrumb } from 'antd';
import type { MenuProps } from 'antd';
import Image from 'next/image';

const { Header, Sider, Content } = Layout;

// itens do menu lateral
const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
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
  }
);

// itens do dropdown de usuário
const userMenuItems: MenuProps['items'] = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: 'Meu Perfil',
  },
  {
    key: 'settings',
    icon: <LaptopOutlined />,
    label: 'Configurações',
  },
  { type: 'divider' },
  {
    key: 'logout',
    label: 'Sair',
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        {/* Logo no topo */}
        <div
          style={{
            height: 64,
            margin: '16px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src="/assets/20250613_1327_Coruja Lâmpada Criativa_remix_01jxn1sysdeqfa5xskp7ae1jtw.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          items={items2}
          style={{ flex: 1, borderRight: 0 }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Botão de colapsar/expandir */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18, width: 48, height: 48 }}
          />

          {/* Avatar com dropdown */}
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
            <Avatar size={32} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
          </Dropdown>
        </Header>

        <Content style={{ padding: '0 48px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]} />
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
