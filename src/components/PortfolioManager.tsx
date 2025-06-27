'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Card, Form, Input, Button, Spin, Space, message } from 'antd';
import AppLayout from '@/components/layout/AppLayout';
import { IconPicker } from './icon/IconPicker';
import * as AntIcons from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Meta } = Card;
const { SettingOutlined, } = AntIcons;

interface Portfolio {
    id: number;
    user_id: number;
    nome_carteira: string;
    icon: string;
    data_criacao: string;
}
interface FormValues {
    nome_carteira: string;
    icon: string;
}

export default function PortfolioManager() {
    const [form] = Form.useForm<FormValues>();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [fetching, setFetching] = useState(true);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<string>('');
    const router = useRouter();

    const loadPortfolios = useCallback(async () => {
        setFetching(true);
        const token = localStorage.getItem('token') || '';
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/pocket/list`,
            { headers: { 'Content-Type': 'application/json', Authorization: token } }
        );
        const data: Portfolio[] = await res.json();
        setPortfolios(data);
        setFetching(false);
    }, []);

    useEffect(() => {
        loadPortfolios();
    }, [loadPortfolios]);

    const onFinish = async (values: FormValues) => {
        setLoading(true);
        const token = localStorage.getItem('token') || '';
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/pocket/add`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: token },
                body: JSON.stringify({ name: values.nome_carteira, icon: values.icon }),
            }
        );

        if (res.ok) {
            messageApi.success('Carteira cadastrada com sucesso');
            form.resetFields();
            setSelectedIcon('');
            loadPortfolios();
        } else {
            messageApi.error('Falha ao cadastrar carteira');
        }
        setLoading(false);
    };

    const IconComponent =
        selectedIcon && (AntIcons[selectedIcon as keyof typeof AntIcons] as React.ComponentType<React.SVGProps<SVGSVGElement>>);

    return (
        <AppLayout breadcrumbItems={[{ title: '' }]}>
            {contextHolder}
            <Row gutter={16}>
                <Col xs={24} md={8} lg={6}>
                    <Card title="Cadastrar Nova Carteira">
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
                                <Form.Item name="icon" noStyle>
                                    <Input type="hidden" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} block>
                                    Cadastrar
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    <IconPicker
                        visible={pickerVisible}
                        selected={selectedIcon}
                        onSelect={icon => {
                            setSelectedIcon(icon);
                            form.setFieldsValue({ icon });
                            setPickerVisible(false);
                        }}
                        onClose={() => setPickerVisible(false)}
                    />
                </Col>

                <Col xs={24} md={16} lg={18}>
                    <Card title="Carteiras Cadastradas">
                        <Spin spinning={fetching}>
                            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                {portfolios.map(item => {
                                    const IconComp =
                                        (AntIcons[item.icon as keyof typeof AntIcons] as React.ComponentType<React.SVGProps<SVGSVGElement>>);
                                    const dataFormatada = new Date(item.data_criacao).toLocaleDateString();

                                    return (
                                        <Card
                                            key={item.id}
                                            hoverable
                                            onClick={() => router.push(`/carteiras/${item.id}`)}
                                            style={{ position: 'relative', cursor: 'pointer', width: '100%' }}
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    display: 'flex',
                                                    gap: 8,
                                                }}
                                            >
                                                <Button
                                                    size="small"
                                                    icon={<SettingOutlined />}
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        router.push(`/carteiras/${item.id}/config`);
                                                    }}
                                                />


                                            </div>

                                            <Meta
                                                avatar={IconComp && <IconComp style={{ fontSize: 24 }} />}
                                                title={item.nome_carteira}
                                                description={dataFormatada}
                                            />
                                        </Card>
                                    );
                                })}
                            </Space>
                        </Spin>
                    </Card>
                </Col>
            </Row>
        </AppLayout>
    );
}
