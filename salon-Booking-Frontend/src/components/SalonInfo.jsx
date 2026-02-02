import "../styles/SalonInfo.css";

export default function SalonInfo() {
  return (
    <div className="salon-info-card">
      {/* LEFT */}
      <div className="salon-left">
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
          alt="Salon"
        />

        <div className="salon-details">
          <div className="rating">
            ⭐⭐⭐⭐⭐ <span>4.9 (255 reviews)</span>
          </div>

          <h3>
            Glamora Hair Studio
            <span className="verify">✔</span>
          </h3>

          <p className="tagline">We connect top talents with top companies</p>

          <div className="meta">
            <span>🏢 Salon Industry</span>
            <span>📅 Member Since 19 Aug 2023</span>
          </div>
        </div>
      </div>

      {/* MIDDLE */}
      <div className="salon-middle">
        <div>
          <strong>📧 Email</strong>
          <p>Glamxxxxx@example.com</p>
        </div>

        <div>
          <strong>🗣 Language Known</strong>
          <p>
            English, Arabic, French <span className="more">+4 More</span>
          </p>
        </div>

        <div>
          <strong>📞 Phone Number</strong>
          <p>+1 888 8XX XXXX</p>
        </div>

        <div>
          <strong>📍 Address</strong>
          <p>Texas, USA</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="salon-right">
        <button className="view-btn">View Salon</button>

        <div className="social">
          <img src="/icons/facebook.png" />
          <img src="/icons/Instagram.png" />
          <img src="/icons/X.png" />
          <img src="/icons/whatsapp.png" />
          <img src="/icons/youtube.png" />
          <img src="/icons/linkedin.png" />
        </div>
      </div>
    </div>
  );
}
