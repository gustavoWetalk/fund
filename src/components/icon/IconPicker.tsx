'use client';

import React, { useState, useMemo } from 'react';
import { Modal, Input, Pagination, Space, Grid } from 'antd';
import * as AntIcons from '@ant-design/icons';

const { Search } = Input;
const { useBreakpoint } = Grid;

interface IconPickerProps {
  visible: boolean;
  selected: string;
  onSelect: (iconName: string) => void;
  onClose: () => void;
}

const ICON_ENTRIES: { name: string; Comp: React.ComponentType<React.SVGProps<SVGSVGElement>> }[] =
  Object.entries(AntIcons)
    .filter(([name]) => name.endsWith('Outlined'))
    .map(([name, Comp]) => ({
      name,
      Comp: Comp as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    }));

export function IconPicker({ visible, selected, onSelect, onClose }: IconPickerProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 49;
  const screens = useBreakpoint();

  const filtered = useMemo(
    () => ICON_ENTRIES.filter(iconEntry =>
      iconEntry.name.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const total = filtered.length;
  const iconsToShow = filtered.slice((page - 1) * pageSize, page * pageSize);
  const cols = screens.xl ? 7 : screens.lg ? 6 : screens.md ? 5 : screens.sm ? 4 : 3;

  return (
    <Modal
      title="Select an Icon"
      open={visible}
      footer={null}
      onCancel={onClose}
      width={800}
    >
      <Search
        placeholder="Search icons (in English)..."
        allowClear
        onSearch={value => { setSearch(value); setPage(1); }}
        style={{ marginBottom: 16 }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12, maxHeight: 400, overflowY: 'auto' }}>
        {iconsToShow.map(({ name, Comp }) => (
          <Space
            key={name}
            direction="vertical"
            align="center"
            style={{ cursor: 'pointer', padding: 8, border: selected === name ? '2px solid #1890ff' : '1px solid #f0f0f0', borderRadius: 4 }}
            onClick={() => onSelect(name)}
          >
            {<Comp style={{ fontSize: 24 }} />}
            <span style={{ fontSize: 12, textAlign: 'center' }}>{name.replace('Outlined', '')}</span>
          </Space>
        ))}
      </div>
      <Pagination
        current={page}
        pageSize={pageSize}
        total={total}
        onChange={p => setPage(p)}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </Modal>
  );
}

