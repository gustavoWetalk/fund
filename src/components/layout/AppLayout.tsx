'use client';
import React, { useState } from 'react';
import { Layout } from 'antd';
import AppSider from './AppSider';
import AppHeader from './AppHeader';
import AppBreadcrumb from './AppBreadcrumb';
import AppContent from './AppContent';

const { Content } = Layout;

interface Props {
  breadcrumbItems: { title: string }[];
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ breadcrumbItems, children }) => {
  const [collapsed, setCollapsed] = useState(false);


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ padding: '0 48px' }}>
          <AppBreadcrumb items={breadcrumbItems} />
          <AppContent>{children}</AppContent>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
