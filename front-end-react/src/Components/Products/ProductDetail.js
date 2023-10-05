import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetail.css'
import { Auth_Context } from '../ContextAuth/AuthContext';
const ProductDetail = ({addToCart}) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate()
  const isAuth = useContext(Auth_Context);
  useEffect(() => {

    fetch(`http://localhost:8000/api/products/${productId}`)
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('حدث خطأ أثناء جلب تفاصيل المنتج:', error);
      });
  }, [productId]);

  return (
    <div className="product-detail-container"> 
      <h1>{product.name}</h1>
      <img src={product.img_url} alt={product.name} />
      <p>{product.description}</p>
      <p className="price"> ${product.price}</p> 
   
      <button onClick={() => {
      if (isAuth.auth.authToken) {
        addToCart(product)
        console.log(isAuth);
        navigate('/cart')
      } else {
        console.log(isAuth)
        navigate('/login')
      }
    }} to={'/cart'}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
