import { Card, Button, Row, Col, Spin } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts, deleteProduct } from '../store/productsSlice';

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Spin tip="Đang tải sản phẩm..." />;

  return (
    <Row gutter={[16, 16]}>
      {products.map(p => (
        <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
          <Card hoverable cover={<img alt={p.name} src={p.imageUrl} style={{ height: 200, objectFit: 'cover' }} />}>
            <Card.Meta title={`${p.name} - ${p.price} đ`} description={p.description} />
            <Button danger type="link" onClick={() => dispatch(deleteProduct(p.id))} style={{ marginTop: 8 }}>
              Xóa
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
