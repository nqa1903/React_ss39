import React, { useState } from 'react';
import axios from 'axios';

export default function UploadImages() {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Vui lòng chọn ít nhất 1 file');
      return;
    }

    setLoading(true);

    try {
      const uploadPromises = files.map(async file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);

        const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData);

        return res.data.secure_url as string;
      });

      const urls = await Promise.all(uploadPromises);
      setImageUrls(urls);
      console.log('Uploaded:', urls);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Nhiều Ảnh lên Cloudinary</h2>

      <input type="file" multiple onChange={handleChangeFile} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Đang upload...' : 'Upload'}
      </button>

      {imageUrls.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Ảnh đã upload:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                style={{
                  maxWidth: '150px',
                  border: '2px solid #ccc',
                  borderRadius: '8px'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
