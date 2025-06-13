// components/PasswordInput.tsx
'use client';
import React from 'react';

import { Input, } from 'antd';

export interface PasswordInputProps {
    placeholder?: string;
    name?: string;
    id?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** Se quiser controlar a visibilidade externamente */
    controlled?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    placeholder = 'Digite sua senha',
    name,
    id,
    value,
    onChange,
    controlled = false,
}) => {
    const [visible, setVisible] = React.useState(false);

    if (controlled) {
        return (
    
                <Input.Password
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    visibilityToggle={{ visible, onVisibleChange: setVisible }}
                    value={value}
                    onChange={onChange}
                    style={{ flex: 1, padding:10 }}
                />
             
          
        );
    }

    return (
        <div>
            <Input.Password placeholder="input password" />
         
        </div>
    );
};

export default PasswordInput;
