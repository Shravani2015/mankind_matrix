
import { useEffect, useState } from 'react';
import { getProductById } from '../../api/productService';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    getProductById(id).then(setProduct).catch(error => {
        if(error.response && error.response.status === 404){
            setNotFound(true);
        } else {
            console.error('Error fetching product:', error);
          }
    });
    
  }, [id]);

  if(notFound) return <div><h1>404</h1>Product Not Found</div>
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
