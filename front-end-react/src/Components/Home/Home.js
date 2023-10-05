import React, { useState } from "react";
import "./Home.css";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import { Link } from "react-router-dom";
const Home = ({ addToCart }) => {
  return (
    <>
      <div className="hero_area ">
        <section className="slider_section">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-5 offset-md-1">
                      <div className="detail-box">
                        <div className="number"></div>
                        <h1>
                          Drool
                          <span>Pet And Animal</span>
                        </h1>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt
                        </p>
                        <div className="btn-box">
                          <a href="" className="btn-1">
                            Read More
                          </a>
                          <Link className="btn-2" to="/product">
                            Shop Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="products-text">Products</div>
      <div className="tags-color">
        <div className="products-cards-list">
          <Products addToCart={addToCart} />
          <div className="products-text">Categories</div>
          <Categories />
        </div>
      </div>
    </>
  );
};

export default Home;
