import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../App.css";
import "./Categories.css";
import "../Products/Products.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Categories = () => {
  const [cats, setcat] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryHasProducts, setCategoryHasProducts] = useState(true); // تتبع وجود منتجات في الفئة المحددة
  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then((resp) => resp.json())
      .then((data) => {
        setcat(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(" Get data error :", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      setIsLoading(true);
      fetch(
        `http://localhost:8000/api/categories/${selectedCategoryId}/products`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setProducts(data);
          setCategoryHasProducts(data.length > 0);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error in get data", error);
          setIsLoading(false);
        });
    } else {
      setCategoryHasProducts(true);
    }
  }, [selectedCategoryId]);

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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="product-container">
      <Carousel responsive={responsive}>
        {cats.map((cat) => (
          <div
            title="Show Products"
            className="product-card"
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
          >
            <div className="badge">Hot</div>
            <div className="product-tumb">
              <img src={cat.img_url} alt={cat.name} />
            </div>
            <div className="product-details">
              <span className="product-category">{cat.category}</span>
              <h4>
                <div onClick={() => handleCategoryClick(cat.id)}>
                  <Link to={`/product/${cat.id}`}>{cat.name}</Link>
                </div>
              </h4>
            </div>
          </div>
        ))}
      </Carousel>
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-message">Loading...</p>
        </div>
      ) : (
        selectedCategoryId &&
        (categoryHasProducts ? (
          <div className="product-list">
            <div className="products-header">
              <h2 className="h2-category">Products in Category</h2>
            </div>
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
                  <p>{product.description.slice(0, 25)}</p>
                  <div className="product-bottom-details">
                    <div className="product-price">
                      <small>${product.old_price}</small>${product.price}
                    </div>
                    <div className="product-links">
                      <a href="#">
                        <FaHeart className="heart-icon" />
                      </a>
                      <Link to="/login">
                        <FaShoppingCart className="cart-icon" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available for this category.</p>
        ))
      )}
    </div>
  );
};
export default Categories;
