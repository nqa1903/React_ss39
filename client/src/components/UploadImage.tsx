import React, { useState } from 'react';
import axios from 'axios';

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Vui lòng chọn file');
      return;
    }

    console.log('CLOUD_NAME:', import.meta.env.VITE_CLOUD_NAME);
    console.log('UPLOAD_PRESET:', import.meta.env.VITE_UPLOAD_PRESET);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);   

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData);
      console.log('Uploaded:', res.data);
      setImageUrl(res.data.secure_url);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Ảnh lên Cloudinary</h2>

      <input type="file" onChange={handleChangeFile} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Ảnh đã upload:</h3>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{
              maxWidth: '300px',
              border: '2px solid #ccc',
              borderRadius: '8px'
            }}
          />
        </div>
      )}
    </div>
  );
}
