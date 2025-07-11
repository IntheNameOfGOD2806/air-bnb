import React from 'react';
import { Table, Avatar, Typography, Button, Card, Dropdown, Menu, Tag } from 'antd';
import { MoreOutlined, ArrowRightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAppstore } from '@/store/store';

export interface Product {
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
}

export interface LatestProductsProps {
  products?: Product[];
}

export function LatestProducts({ products = [] }: LatestProductsProps): React.JSX.Element {
  const { tourListings } = useAppstore();
  const { listings } = useAppstore();
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 64,
      render: (image: string) =>
        image ? (
          <Avatar shape="square" size={48} src={image} />
        ) : (
          <Avatar shape="square" size={48} style={{ backgroundColor: '#f0f0f0' }} />
        ),
    },
    {
      title: 'Tên listing',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: Date) => (
        <Typography.Text type="secondary">{`Đăng ngày ${dayjs(date).format('DD/MM/YYYY')}`}</Typography.Text>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 48,
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Hành động 1</Menu.Item>
              <Menu.Item key="2">Hành động 2</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const dataSource = products.map((product) => ({
    key: product.id,
    ...product,
  }));

  return (
    <Card
      title={
        <div>
          <span className="text-2xl font-bold">Danh sách listings</span>
          <div className="text-base mx-1">Số tour: 
            <Tag color="blue">{tourListings?.length}</Tag>
            </div>
          <div className="text-base mx-1">Số điểm lưu trú: 
            <Tag color="green">{listings?.length}</Tag>
            </div>
        </div>
      }
      extra={
        <Button type="link" icon={<ArrowRightOutlined />} className="text-base">
          View all
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showQuickJumper: true,
        }}
        rowKey="id"
      />
    </Card>
  );
}
