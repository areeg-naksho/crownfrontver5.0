import React from 'react'
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const DropDown = ({ name }) => {
    const [visible, setVisible] = React.useState(false);

    const handleMenuClick = e => {
        if (e.key === '6') {
            setVisible(false);
        }
    };

    const handleVisibleChange = flag => {
        setVisible(flag);
    };

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Meat',
                    key: '1',
                },
                {
                    label: 'Eggs',
                    key: '2',
                },
                {
                    label: 'Milk',
                    key: '3',
                },
                {
                    label: 'Vegetables',
                    key: '4',
                },
                {
                    label: 'Fruits',
                    key: '5',
                },
                {
                    label: 'Honey',
                    key: '6',
                },
            ]}
        />
    );
    return (
        <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
            <a onClick={e => e.preventDefault()}>
                <Space>
                    {name}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
};


export default DropDown