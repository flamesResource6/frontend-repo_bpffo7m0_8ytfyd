function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="aspect-[4/3] bg-gray-100 rounded overflow-hidden mb-3">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <h3 className="font-semibold text-gray-900">{product.name}</h3>
      <p className="text-blue-700 font-bold mt-1">${Number(product.price).toFixed(2)}</p>
      {product.description && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{product.description}</p>}
      <a
        href={product.amazonLink || '#'}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex justify-center items-center rounded bg-blue-600 text-white px-3 py-2 hover:bg-blue-700"
      >
        Buy on Amazon
      </a>
    </div>
  )
}

export default ProductCard
