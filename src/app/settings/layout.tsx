'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Menu, theme } from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  BellOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import AppLayout from '@/components/layout/AppLayout';

const { Sider, Content } = Layout;

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const selectedKey = pathname.split('/')[2] || 'account';

  const {
    token: { colorBgContainer, borderRadiusLG,colorBorder },
  } = theme.useToken();

  const menuItems = [
    { key: 'apps', icon: <AppstoreOutlined />, label: <Link href="/settings/apps">Apps</Link> },
    { key: 'account', icon: <UserOutlined />, label: <Link href="/settings/account">Account</Link> },
    { key: 'notification', icon: <BellOutlined />, label: <Link href="/settings/notification">Notification</Link> },
    { key: 'language', icon: <GlobalOutlined />, label: <Link href="/settings/language">Language & Region</Link> },
  ];

  return (
    <AppLayout breadcrumbItems={[{ title: '' }]}>
      <Layout style={{ background: 'transparent', borderRadius: borderRadiusLG, overflow: 'hidden' }}>
        <Sider width={240} style={{ background: colorBgContainer, borderRight: `1px solid ${colorBorder}`, boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            style={{ height: '100%', border: 'none' }}
          />
        </Sider>
        <Layout style={{ padding: 24, background: colorBgContainer }}>
          <Content
            style={{ background: colorBgContainer, borderRadius: borderRadiusLG, minHeight: 380 }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AppLayout>
  );
}
