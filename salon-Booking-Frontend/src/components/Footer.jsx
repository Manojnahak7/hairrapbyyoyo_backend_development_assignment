import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* TOP */}
      <div className="footer-top">
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Product</h4>
            <a>Features</a>
            <a>Pricing</a>
            <a>Case studies</a>
            <a>Reviews</a>
            <a>Updates</a>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <a>Getting started</a>
            <a>Help center</a>
            <a>Server status</a>
            <a>Report a bug</a>
            <a>Chat support</a>
          </div>

          <div className="footer-col">
            <h4>For Provider</h4>
            <a>About</a>
            <a>Contact us</a>
            <a>Careers</a>
            <a>Faq’s</a>
            <a>Blog</a>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <a>Getting started</a>
            <a>Help center</a>
            <a>Other Products</a>
            <a>Report a bug</a>
            <a>Chat support</a>
          </div>
        </div>

        {/* SUBSCRIBE */}
        <div className="footer-subscribe">
          <h4>SignUp For Subscription</h4>
          <input type="email" placeholder="Enter Email Address" />
          <button>Subscribe</button>

          <div className="store-buttons">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Play Store"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <div className="socials">
          <img src="/icons/facebook.png" alt="Facebook" />
          <img src="/icons/Instagram.png" alt="Instagram" />
          <img src="/icons/X.png" alt="Twitter" />
          <img src="/icons/whatsapp.png" alt="WhatsApp" />
          <img src="/icons/youtube.png" alt="YouTube" />
          <img src="/icons/linkedin.png" alt="LinkedIn" />
        </div>

        <p>Copyright © 2025 - All Rights Reserved SalonWala</p>

        <div className="footer-links">
          <a>Terms and Conditions</a>
          <span>|</span>
          <a>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
