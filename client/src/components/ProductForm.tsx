import { Form, Input, InputNumber, Button, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../hooks/redux';
import { createProduct } from '../store/productsSlice';
import { useState } from 'react';
import axios from 'axios';

export default function ProductForm() {
  const dispatch = useAppDispatch();
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleUpload = async ({ file }: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData);
      setImageUrl(res.data.secure_url);
      message.success('Upload ảnh thành công!');
    } catch (err) {
      console.error(err);
      message.error('Upload thất bại!');
    }
  };

  const onFinish = (values: any) => {
    if (!imageUrl) {
      message.error('Vui lòng upload ảnh sản phẩm!');
      return;
    }
    dispatch(
      createProduct({
        name: values.name,
        price: values.price,
        description: values.description,
        imageUrl
      })
    );
    message.success('Thêm sản phẩm thành công!');
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 600, marginBottom: 24 }}>
      <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>

      <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
        <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập giá sản phẩm" />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <Input.TextArea rows={3} placeholder="Nhập mô tả sản phẩm" />
      </Form.Item>

      <Form.Item label="Ảnh sản phẩm">
        <Upload customRequest={handleUpload} listType="picture-card" maxCount={1} showUploadList={true}>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
}
