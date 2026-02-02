import { Link } from "react-router-dom";
import "../styles/PageBanner.css";

export default function PageBanner({ title }) {
  return (
    <div
      className="page-banner"
      style={{
        backgroundImage: "url('/salon-banner.jpg')",
      }}
    >
      <div className="overlay">
        <h1>{title}</h1>

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
}
