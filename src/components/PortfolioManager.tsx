
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Card, Form, Input, Button, List, Spin, Space, message } from 'antd';
import AppLayout from '@/components/layout/AppLayout';
import { IconPicker } from './icon/IconPicker';
import * as AntIcons from '@ant-design/icons';

interface Portfolio { id: number; user_id: number; nome_carteira: string; icon: string; data_criacao: string; }
interface FormValues { nome_carteira: string; icon: string; }

export default function PortfolioManager() {
    const [form] = Form.useForm<FormValues>();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [fetching, setFetching] = useState(true);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<string>('');

    const loadPortfolios = useCallback(async () => {
        setFetching(true);
        const res = await fetch('/pocket/list');
        const data: Portfolio[] = await res.json();
        setPortfolios(data);
        setFetching(false);
    }, []);

    useEffect(() => { loadPortfolios(); }, [loadPortfolios]);

    const onFinish = async (values: FormValues) => {
        setLoading(true);
        const token = localStorage.getItem('token') || '';
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}pocket/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({ name: values.nome_carteira, icon: values.icon }),
        });
        if (response.ok) {
            messageApi.success('Carteira cadastrada com sucesso');
            form.resetFields();
            setSelectedIcon('');
            loadPortfolios();
        } else {
            messageApi.error('Falha ao cadastrar carteira');
        }
        setLoading(false);
    };

    const IconComponent = selectedIcon
        ? (AntIcons[selectedIcon as keyof typeof AntIcons] as React.ComponentType<React.SVGProps<SVGSVGElement>>)
        : null;

    return (
        <AppLayout breadcrumbItems={[{ title: '' }]}>
            {contextHolder}
            <Row gutter={16}>
                <Col xs={24} md={8} lg={6}>
                    <Card title="Cadastrar Nova Carteira" >
                        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ icon: '' }}>
                            <Form.Item name="nome_carteira" label="Nome da Carteira" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Ícone">
                                <Space>
                                    <Button type="default" onClick={() => setPickerVisible(true)} style={{ width: '100%' }}>
                                        {IconComponent && <IconComponent style={{ fontSize: 24 }} />}
                                        {selectedIcon ? selectedIcon.replace('Outlined', '') : 'Escolher ícones'}
                                    </Button>
                                </Space>
                                <Form.Item name="icon" noStyle><Input type="hidden" /></Form.Item>
                            </Form.Item>
                            <Form.Item><Button type="primary" htmlType="submit" loading={loading} block>Cadastrar</Button></Form.Item>
                        </Form>
                    </Card>
                    <IconPicker
                        visible={pickerVisible}
                        selected={selectedIcon}
                        onSelect={(icon) => { setSelectedIcon(icon); form.setFieldsValue({ icon }); setPickerVisible(false); }}
                        onClose={() => setPickerVisible(false)}
                    />
                </Col>
                <Col xs={24} md={16} lg={18}>
                    <Card title="Carteiras Cadastradas">
                        <Spin spinning={fetching}>
                            <List
                                dataSource={portfolios}
                                renderItem={(item) => {
                                    const Comp = AntIcons[item.icon as keyof typeof AntIcons] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
                                    return (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={Comp && <Comp style={{ fontSize: 24 }} />}
                                                title={item.nome_carteira}
                                                description={new Date(item.data_criacao).toLocaleDateString()}
                                            />
                                        </List.Item>
                                    );
                                }}
                            />
                        </Spin>
                    </Card>
                </Col>
            </Row>
        </AppLayout>
    );
}
