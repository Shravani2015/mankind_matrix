
import { useEffect, useState } from 'react';
import { getProductById } from '../../api/productService';

const ProductPage = ({ id }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(1).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;
// TODO: sample page need to update
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.category} - ${product.price}</p>
    </div>
  );
};

export default ProductPage;
