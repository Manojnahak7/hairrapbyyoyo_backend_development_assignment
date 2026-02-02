import { useState } from "react";
import "../styles/FilterSidebar.css";

// React Icons
import { FiFilter, FiChevronDown, FiMapPin, FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function FilterSidebar() {
  const [price, setPrice] = useState(369);

  return (
    <aside className="filter-sidebar">
      {/* HEADER */}
      <div className="filter-header">
        <div className="filter-title">
          <FiFilter className="filter-icon" />
          <span>Filters</span>
        </div>
        <span className="reset-text">Reset Filter</span>
      </div>

      {/* SEARCH */}
      <div className="filter-block">
        <label>Search By Keyword</label>
        <input type="text" placeholder="What are you looking for?" />
      </div>

      {/* CATEGORIES */}
      <div className="filter-block">
        <div className="label-row">
          <label>Categories</label>
          <FiChevronDown className="chevron" />
        </div>

        <div className="check-row">
          <input type="checkbox" /> All Categories
        </div>
        <div className="check-row">
          <input type="checkbox" /> Hair Cut and Blow Dry
        </div>
        <div className="check-row">
          <input type="checkbox" /> Royal Hair Cut
        </div>
        <div className="check-row active">
          <input type="checkbox" defaultChecked /> Kids Cut
        </div>
        <div className="check-row">
          <input type="checkbox" /> Elegant Hair Wash
        </div>
        <div className="check-row">
          <input type="checkbox" /> Root Touch up
        </div>
        <div className="check-row">
          <input type="checkbox" /> Hair Color
        </div>

        <span className="view-more">View More</span>
      </div>

      {/* SUB CATEGORY */}
      <div className="filter-block">
        <label>Sub Category</label>
        <select>
          <option>Select Sub Category</option>
        </select>
      </div>

      {/* LOCATION */}
      <div className="filter-block">
        <label>Location</label>

        <div className="select-with-icon">
          <FiMapPin className="select-icon" />
          <select>
            <option>Select Location</option>
          </select>
        </div>
      </div>

      {/* PRICE */}
      <div className="filter-block">
        <label>Price Range</label>

        <div className="price-row">
          <span>₹0</span>
          <span className="price-badge">₹{price}</span>
          <span>₹999</span>
        </div>

        <input
          type="range"
          min="0"
          max="999"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <p className="price-note">Price: ₹50 - ₹2000</p>
      </div>

      {/* RATINGS */}
      <div className="filter-block">
        <div className="rating-header">
          <label>Ratings</label>
          <FiChevronDown className="rating-arrow" />
        </div>

        <div className="rating-row">
          <input type="checkbox" />
          <span className="stars">★★★★★</span>
          <span className="count">(55)</span>
        </div>

        <div className="rating-row">
          <input type="checkbox" />
          <span className="stars">★★★★☆</span>
          <span className="count">(48)</span>
        </div>

        <div className="rating-row">
          <input type="checkbox" />
          <span className="stars">★★★☆☆</span>
          <span className="count">(13)</span>
        </div>

        <div className="rating-row">
          <input type="checkbox" />
          <span className="stars">★★☆☆☆</span>
          <span className="count">(05)</span>
        </div>

        <div className="rating-row">
          <input type="checkbox" />
          <span className="stars">★☆☆☆☆</span>
          <span className="count">(00)</span>
        </div>
      </div>

      {/* SEARCH BUTTON */}
      <button className="filter-search-btn">
        <FiSearch className="search-icon" />
        Search
      </button>
    </aside>
  );
}
