import React from 'react';
import { Breadcrumb } from 'antd';

interface Props {
  items: { title: string }[];
}

const AppBreadcrumb: React.FC<Props> = ({ items }) => (
  <Breadcrumb style={{ margin: '16px 0' }} items={items} />
);

export default AppBreadcrumb;
