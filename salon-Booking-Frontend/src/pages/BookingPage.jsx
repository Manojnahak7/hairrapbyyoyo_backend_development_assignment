import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/BookingExact.css";
import SalonInfo from "../components/SalonInfo";

export default function BookingPage() {
  const { serviceId } = useParams();

  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    api.get(`/services/${serviceId}`).then((res) => {
      setService(res.data);
    });
  }, [serviceId]);

  const handleBooking = async () => {
    try {
      const userId = JSON.parse(
        atob(localStorage.getItem("token").split(".")[1]),
      ).id;

      await api.post("/bookings", {
        userId,
        serviceId,
        stylistId: 1, // abhi static (later dynamic)
        date,
        time,
      });

      alert("✅ Booking Successful");
    } catch (err) {
      alert("❌ Booking Failed");
    }
  };

  return (
    <>
      <Navbar />

      {/* BANNER */}
      <div className="booking-banner">
        <h2>Booking</h2>
        <p>Home › Services › Booking</p>
      </div>

      {/* BOOKING FORM */}
      <div className="booking-container">
        <SalonInfo />

        <h2>Book an Appointment</h2>
        <p className="subtext">
          Ready to take the first step toward your dream property? Fill out the
          form below, and our real estate wizards will work their magic to find
          your perfect match.
        </p>

        <form className="booking-form">
          {/* ROW 1 */}
          <div className="form-row four">
            <div>
              <label>First Name</label>
              <input placeholder="Enter First Name" />
            </div>
            <div>
              <label>Last Name</label>
              <input placeholder="Enter Last Name" />
            </div>
            <div>
              <label>Email</label>
              <input placeholder="Enter your Email" />
            </div>
            <div>
              <label>Phone</label>
              <input placeholder="Enter Phone Number" />
            </div>
          </div>

          {/* CHOOSE WHOM */}
          <div className="form-row one">
            <label>Choose Whom</label>
            <select>
              <option>Select gender</option>
            </select>
          </div>

          {/* ROW 3 */}
          <div className="form-row four">
            <div>
              <label>Choose Stylist</label>
              <select>
                <option>Select Stylist</option>
              </select>
            </div>
            <div>
              <label>Gender</label>
              <select>
                <option>Select Gender</option>
              </select>
            </div>
            <div>
              <label>Services Type</label>
              <select>
                <option>Select Services</option>
              </select>
            </div>
            <div>
              <label>Service Category</label>
              <select>
                <option>Select Category</option>
              </select>
            </div>
          </div>

          {/* ROW 4 */}
          <div className="form-row two">
            <div>
              <label>Select Date</label>
              <input type="date" onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label>Time</label>
              <input type="time" onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          {/* MESSAGE */}
          <div className="form-row one">
            <label>Message</label>
            <textarea placeholder="Enter your Message here..."></textarea>
          </div>

          <div className="price-row">
            <div className="price-left">
              <span className="total">Total</span>
              <div>
                <strong>₹{service?.price}</strong>
              </div>
            </div>
          </div>

          {/* TERMS + BUTTON */}
          <div className="form-footer">
            <div className="terms">
              <input type="checkbox" />
              <p>
                I agree with <span>Terms of Use</span> and{" "}
                <span>Privacy Policy</span>
              </p>
            </div>

            <button type="button" className="book-now" onClick={handleBooking}>
              Book Now
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}
