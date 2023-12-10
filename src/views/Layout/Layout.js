import React, { useState } from 'react';
import {
    HomeOutlined, MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    AppstoreOutlined, MailOutlined, SettingOutlined, ExclamationCircleFilled
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Flex, Modal, } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import './Layout.scss'
const { confirm } = Modal;
export default function () {
    const navigate = useNavigate();
    // 菜单项当前选项
    const [current, setCurrent] = useState('home');
    // 顶部菜单项
    const items = [
        {
            label: '首页',
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: '通知',
            key: 'noti',
            icon: <MailOutlined />,
        },
        {
            label: '个人中心',
            key: 'one',
            icon: <MailOutlined />,
        },
        {
            label: 'Navigation Two',
            key: 'app',
            icon: <AppstoreOutlined />,
            // disabled: true,
        },
        {
            label: '个人中心',
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                {
                    key: '1',
                    label: '个人信息',
                },
                {
                    key: '2',
                    label: '修改密码',
                },
                {
                    key: '3',
                    label: '退出系统',
                },
            ],
        },
        {
            label: (
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    Github
                </a>
            ),
            key: 'alipay',
        },
    ];
    // 左侧菜单项
    const items2 = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav1',
            children: [
                {
                    key: '1-1',
                    label: 'nav 1-1',
                },
                {
                    key: '1-2',
                    label: 'nav 1-1',
                },
                {
                    key: '1-3',
                    label: 'nav 1-1',
                }
            ]
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
            children: [
                {
                    key: '1-1',
                    label: 'nav 1-1',
                },
                {
                    key: '1-2',
                    label: 'nav 1-1',
                },
                {
                    key: '1-3',
                    label: 'nav 1-1',
                }
            ]
        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
        },
    ]
    // 点击菜单方法
    const onClickMenu = (e) => {
        setCurrent(e.key)
        // 判断点击的菜单项
        // debugger
        switch (e.key) {
            // 退出系统
            case '3':
                confirm({
                    title: '系统提示',
                    icon: <ExclamationCircleFilled />,
                    content: '确定退出系统？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        // 清除登录缓存
                        sessionStorage.clear();
                        localStorage.clear();
                        // 跳转登录页
                        navigate('/login')
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
                break
        }
    }

    //侧边栏折叠状态
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className='layout'>
            {/* <Modal title="系统提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>确定退出系统吗？</p>
            </Modal> */}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">{collapsed ? 'co-js' : 'CogniJS'}</div>
                <Menu
                    onClick={onClickMenu}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items2}
                />
            </Sider>
            <Layout className='right'>
                <Header className='header'
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button className='button'
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Menu onClick={onClickMenu} className="menu" selectedKeys={[current]} mode="horizontal" items={items} />

                </Header>
                <Content className='content'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >

                    Content
                </Content>
            </Layout>
        </Layout>
    );
};
