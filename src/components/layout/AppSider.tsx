'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  WalletOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import Image from 'next/image';

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AppSider: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const pathToKey = useCallback((path: string): string => {
    if (path.startsWith('/carteira/cadastro')) return 'carteira:cadastro';
    if (path.startsWith('/carteira/listagem')) return 'carteira:listagem';
    if (path.startsWith('/carteira/analise')) return 'carteira:analise';
    if (path.startsWith('/dashboard')) return 'dashboard';
    return '';
  }, []);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const key = pathToKey(pathname);
    setSelectedKeys(key ? [key] : []);
    if (key.includes('carteira:')) {
      setOpenKeys(['carteira']);
    } else {
      setOpenKeys([]);
    }
  }, [pathname, pathToKey]);

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    setSelectedKeys([key]);
    // navega
    switch (key) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'carteira:cadastro':
        router.push('/carteira/cadastro');
        break;
      case 'carteira:listagem':
        router.push('/carteira/listagem');
        break;
      case 'carteira:analise':
        router.push('/carteira/analise');
        break;
    }
  };

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    setOpenKeys(keys);
  };

  const items: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <HomeOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'carteira',
      icon: <WalletOutlined />,
      label: 'Carteira',
      children: [
        {
          key: 'carteira:cadastro',
          icon: <PlusCircleOutlined />,
          label: 'Cadastro',
        },
        {
          key: 'carteira:listagem',
          icon: <UnorderedListOutlined />,
          label: 'Listagem de Ações',
        },
        {
          key: 'carteira:analise',
          icon: <LineChartOutlined />,
          label: 'Análise',
        },
      ],
    },
  ];

  return (
    <Sider
      width={280}
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
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onMenuClick}
        items={items}
        style={{ flex: 1, borderRight: 0, backgroundColor: colorBgContainer, fontSize: 18 }}
      />
    </Sider>
  );
};

export default AppSider;
