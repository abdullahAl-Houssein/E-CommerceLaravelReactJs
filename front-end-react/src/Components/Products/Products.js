import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../App.css";
import "./Products.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Auth_Context } from "../ContextAuth/AuthContext";
import { useCart } from "../Cart/CartContext";
const Products = () => {
  const  {addToCart}  = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isAuth = useContext(Auth_Context);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("GET Data Error", error);
      });
  }, []);

  return (
    <div className="product-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-message">Loading...</p>
        </div>
      ) : (
        <Carousel responsive={responsive}>
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="badge">Hot</div>
              <div className="product-tumb">
                <img src={product.img_url} alt={product.name} />
              </div>
              <div className="product-details">
                <span className="product-category">{product.category}</span>
                <h4>
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h4>
                <p>{product.description.slice(0, 25)} ...</p>
                <div className="product-bottom-details">
                  <div className="product-price">
                    <small></small>${product.price}
                  </div>
                  <div className="product-links">
                    <a href="#">
                      <FaHeart className="heart-icon cart-icon" />
                    </a>

                    <Link to={isAuth.auth.authToken ? "/cart" : "/login"}>
                      <FaShoppingCart
                      
                        onClick={() => {
                          if (isAuth.auth.authToken) {
                            addToCart(product)
                            console.log(isAuth.auth.authToken);
                            navigate("/cart");
                          } else {
                            console.log(isAuth.auth.authToken);
                            navigate("/login");
                          }
                        }}
                        className="cart-icon"
                      />
                      
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Products;
