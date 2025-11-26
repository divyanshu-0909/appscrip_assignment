import { useState, useEffect } from 'react';
import { useFilterContext } from '../context/FilterContext';

export default function Footer() {
  const { isMobile } = useFilterContext();
  return (
    <footer className="site-footer-dark" role="contentinfo">
      <div className="newsletter">
        <div className="newsletter-left">
          <h3>BE THE FIRST TO KNOW</h3>
          <p>Sign up for updates from mettā muse.</p>
        </div>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()} aria-label="Subscribe to newsletter">
          <label className="visually-hidden" htmlFor="email">Enter your e-mail</label>
          <input id="email" name="email" type="email" placeholder="Enter your e-mail..." aria-label="Enter your email" />
          <button type="submit" className="subscribe-button" aria-label="Subscribe">SUBSCRIBE</button>
        </form>

        <div className="newsletter-right">
          <div className="contact">
            <h4>CONTACT US</h4>
            <p><a href="tel:+442321335300">+44 232 133 5300</a></p>
            <p><a href="mailto:customercare@mettamuse.com">customercare@mettamuse.com</a></p>
          </div>

          <div className="currency">
            <h4>CURRENCY</h4>
            <p>USD</p>
            <p className="note">Transactions will be completed in Euros and a currency reference is available on the invoice.</p>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-col">
          <details open={!isMobile} className="footer-accordion">
            <summary className="brand">mettā muse</summary>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Stories</a></li>
              <li><a href="#">Artisans</a></li>
              <li><a href="#">Boutiques</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">EU Compliance Docs</a></li>
            </ul>
          </details>
        </div>

        <div className="footer-col">
          <details open={!isMobile} className="footer-accordion">
            <summary>QUICK LINKS</summary>
            <ul>
              <li><a href="#">Orders & Shipping</a></li>
              <li><a href="#">Join/Login as a Seller</a></li>
              <li><a href="#">Payment & Pricing</a></li>
              <li><a href="#">Return & Refunds</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </details>
        </div>

        <div className="footer-col footer-right">
          <details open={!isMobile} className="footer-accordion">
            <summary>FOLLOW US</summary>
            <div className="socials">
              <a aria-label="Instagram" href="#" className="social-icon"> 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.2" />
                  <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.2"/>
                  <circle cx="17.5" cy="6.5" r="0.6" fill="white" />
                </svg>
              </a>
              <a aria-label="LinkedIn" href="#" className="social-icon"> 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="white" strokeWidth="1.2" />
                  <path d="M8.1 10.8V16" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M8.1 8.9V9.1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M12.2 16V12.3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M12.2 12.3c0-.9.6-1.6 1.4-1.6.8 0 1.7.6 1.7 1.6V16" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </a>
            </div>

            <div className="accepted">
              <h6>mettā muse ACCEPTS</h6>
              <div className="payments">
                <img src="/images/gpay.svg" alt="Google Pay" width="60" height="36" />
                <img src="/images/master.svg" alt="Mastercard" width="60" height="36" />
                <img src="/images/visa.svg" alt="VISA" width="60" height="36" />
                <img src="/images/apple-pay.svg" alt="Apple Pay" width="60" height="36" />
              </div>
            </div>
          </details>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © {new Date().getFullYear()} mettā muse. All rights reserved.</p>
      </div>
    </footer>
  );
}
