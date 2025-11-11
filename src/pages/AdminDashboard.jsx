import { useEffect, useState } from 'react'

function AdminDashboard() {
  const [form, setForm] = useState({ name: '', description: '', price: '', imageUrl: '', amazonLink: '' })
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const token = localStorage.getItem('token')

  const fetchProducts = async () => {
    const res = await fetch(`${baseUrl}/api/products`)
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    if (!token) {
      window.location.href = '/admin'
      return
    }
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const addProduct = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price || 0),
          imageUrl: form.imageUrl,
          amazonLink: form.amazonLink,
        })
      })
      if (!res.ok) throw new Error('Failed to add product')
      setForm({ name: '', description: '', price: '', imageUrl: '', amazonLink: '' })
      fetchProducts()
    } catch (e) {
      setError(e.message)
    }
  }

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      if (!res.ok) throw new Error('Failed to delete product')
      fetchProducts()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h1>

      <form onSubmit={addProduct} className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border rounded p-2" placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
        <input className="border rounded p-2" placeholder="Price" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
        <input className="border rounded p-2 md:col-span-2" placeholder="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
        <input className="border rounded p-2 md:col-span-2" placeholder="Amazon Link" name="amazonLink" value={form.amazonLink} onChange={handleChange} />
        <textarea className="border rounded p-2 md:col-span-2" placeholder="Description" name="description" value={form.description} onChange={handleChange} />
        {error && <p className="text-red-600 md:col-span-2">{error}</p>}
        <div className="md:col-span-2">
          <button type="submit" className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Add Product</button>
        </div>
      </form>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-lg shadow p-4">
            <div className="aspect-[4/3] bg-gray-100 rounded overflow-hidden mb-3">
              {p.imageUrl ? <img alt={p.name} src={p.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>}
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <p className="text-blue-700 font-bold mt-1">${Number(p.price).toFixed(2)}</p>
              </div>
              <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
