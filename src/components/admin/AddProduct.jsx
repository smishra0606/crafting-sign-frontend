import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', category: '', price: '', description: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFile = (e) => setFile(e.target.files[0] || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!file) {
      setErrorMsg('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('description', form.description);

    try {
      setLoading(true);
      const res = await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccessMsg('Product created successfully.');
      setForm({ name: '', category: '', price: '', description: '' });
      setFile(null);
    } catch (err) {
      console.error('Upload error:', err);
      const message = err?.response?.data?.message || err.message || 'Upload failed';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

      {successMsg && <div className="p-2 mb-2 bg-green-100 text-green-800">{successMsg}</div>}
      {errorMsg && <div className="p-2 mb-2 bg-red-100 text-red-800">{errorMsg}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="block mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Price</label>
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>

        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
          {loading ? 'Uploading...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
