import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import UploadImage from './components/UploadImage';
import UploadImages from './components/UploadImages';

export default function App() {
  return (
    <div>
      <UploadImage />
      <hr />
      <UploadImages />
      <hr />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-center mb-6">Quản lý sản phẩm</h1>
          <div className="bg-white p-4 rounded shadow mb-8">
            <ProductForm />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}
