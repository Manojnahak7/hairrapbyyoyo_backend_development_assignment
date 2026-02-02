import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { FaStar, FaHeart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
export default function ServiceCard({ service }) {
  const navigate = useNavigate();

  const handleBook = () => {
    if (!isLoggedIn()) {
      localStorage.setItem("redirectAfterLogin", `/booking/${service.id}`);
      navigate("/login");
    } else {
      navigate(`/booking/${service.id}`);
    }
  };

  return (
    <div className="service-card-exact">
      {/* IMAGE */}
      <div className="image-box">
        <img src={`http://localhost:5000${service.image}`} alt="service" />

        <span className="tag">Hair Cut</span>
        <span className="wishlist">
          <FaHeart />
        </span>
      </div>

      {/* CONTENT */}
      <div className="card-info">
        <h4>{service.name}</h4>

        {/* LOCATION + RATING (SAME ROW) */}
        <div className="location-rating">
          <p className="location">
            <MdLocationOn /> {service.location}
          </p>

          <span className="rating">
            <FaStar /> {service.rating}
          </span>
        </div>

        {/* PRICE LEFT + BUTTON RIGHT */}
        <div className="price-book">
          <div className="price">
            ₹{service.price} <small>₹699</small>
          </div>

          <button className="book-btn-exact" onClick={handleBook}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
