'use client';

import AppLayout from '@/components/layout/AppLayout';
import { Column, Pie } from '@ant-design/charts';
import { Card } from 'antd';

export default function HomePage() {
  const investmentData = [
    { type: 'Janeiro', value: 500 },
    { type: 'Fevereiro', value: 700 },
    { type: 'Março', value: 800 },
    { type: 'Abril', value: 650 },
  ];

  const educationData = [
    { type: 'Cursos Completos', value: 5 },
    { type: 'Notícias Lidas', value: 12 },
    { type: 'Webinars Assistidos', value: 3 },
  ];

  const columnConfig = {
    data: investmentData,
    xField: 'type',
    yField: 'value',
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      type: { alias: 'Mês' },
      value: { alias: 'Investimento (€)' },
    },
  };

  const pieConfig = {
    appendPadding: 6,
    data: educationData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'outer',
      content: '{name} ({percentage})',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <AppLayout breadcrumbItems={[{ title: 'Dashboard' }]}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-1">
          <h2 className="text-xl font-semibold mb-4">Investimentos Mensais</h2>
          <Column {...columnConfig} />
        </Card>
        <Card className="p-1">
          <h2 className="text-xl font-semibold mb-4">Educação Financeira</h2>
          <Pie {...pieConfig} />
        </Card>
      </div>
    </AppLayout>
  );
}
