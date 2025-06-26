
'use client';

import React from 'react';
import { Card, Radio } from 'antd';
import { useTheme } from '@/app/providers/ThemeProvider';

export default function SettingsPage() {
  const { mode, setMode } = useTheme();

  return (
    <div>
      <h1 className="mb-4 text-3xl">Account Settings</h1>
      <h3 className="mb-2 text-base">Tema</h3>
      <Card>
        <Radio.Group
          value={mode}
          onChange={e => setMode(e.target.value as 'light' | 'dark' | 'system')}
          optionType="button"
          buttonStyle="solid"
          size="small"
          className="mb-4"
        >
          <Radio.Button value="light">Light</Radio.Button>
          <Radio.Button value="dark">Dark</Radio.Button>
          <Radio.Button value="system">System</Radio.Button>
        </Radio.Group>
      </Card>
    </div>
  );
}
