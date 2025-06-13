'use client';
import React from 'react';
import { Layout, Breadcrumb, theme } from 'antd';

const { Content } = Layout;

const ContentLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ padding: '0 48px' }}>
      <Breadcrumb
        style={{ margin: '16px 0' }}
        items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
      />
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
  );
};

export default ContentLayout;
