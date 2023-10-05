import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer(props) {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <h2 className="footer-subscription-heading">Join our newsletter</h2>
        <p className="footer-subscription-text">
          Subscribe to get updates on our latest articles. You can unsubscribe
          at any time.
        </p>
        <div className="input-area">
          <input
            className="footer-input"
            name="email"
            type="email"
            placeholder="Your Email"
          />
          <Link to="/sign-in" className="btn-outline">
            Subscribe
          </Link>
        </div>
      </section>

      <div className="footer-link-wrapper">
        <div className="footer-link-items">
          <h2>About Us</h2>
          <Link to="/sign-up">How it works</Link>
          <Link to="/">Testimonials</Link>
          <Link to="/">Careers</Link>
          <Link to="/">Investors</Link>
        </div>
        <div className="footer-link-items">
          <h2>Contact Us</h2>
          <Link to="/">Contact</Link>
          <Link to="/">Support</Link>
          <Link to="/">Destinations</Link>
          <Link to="/">Sponsorships</Link>
        </div>
        <div className="footer-link-items">
          <h2>Videos</h2>
          <Link to="/">Submit Video</Link>
          <Link to="/">Ambassadors</Link>
          <Link to="/">Agency</Link>
          <Link to="/">Influencer</Link>
        </div>
        <div className="footer-link-items">
          <h2>Social Media</h2>
          <Link to="/">Instagram</Link>
          <Link to="/">Facebook</Link>
          <Link to="/">Youtube</Link>
          <Link to="/">Twitter</Link>
          <Link to="/">LinkedIn</Link>
        </div>
      </div>

      <section className="social-media">
        <div className="social-media-wrap">
          <Link to="/" className="social-logo">
            Abdullah <i className="fa fa-adjust"></i>
          </Link>
          <small className="website-rights">ABDULLAH © 2020</small>
          <div className="social-icons">
            <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </Link>
            <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube"></i>
            </Link>
            <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </Link>
            <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
