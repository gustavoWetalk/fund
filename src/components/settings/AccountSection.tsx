// components/settings/AccountSection.tsx
import { Card } from 'antd';
import React from 'react';

export default function AccountSection() {
    return (
        <div>
            <h1 className='mb-4'>Account Settings</h1>
            <Card>
                <p>Esta é a seção de configurações de conta.</p>
                {/* aqui você pode adicionar formulários, inputs, etc */}
            </Card>
        </div>
    );
}
