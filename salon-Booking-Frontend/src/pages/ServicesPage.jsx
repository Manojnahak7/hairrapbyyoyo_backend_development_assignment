import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import FilterSidebar from "../components/FilterSidebar";
import ServiceCard from "../components/ServiceCard";
import Pagination from "../components/Pagination";
import "../styles/ServicesExact.css";
import Footer from "../components/Footer";

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get("/services").then((res) => {
      setServices(res.data.data || res.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <PageBanner title="Services" />

      <div className="services-wrapper">
        <FilterSidebar />

        <div className="services-main">
          {/* TOP BAR */}
          <div className="services-topbar">
            <h3>
              Found <span>{services.length}</span> Services
            </h3>

            <div className="topbar-right">
              <div className="sort-box">
                <label>Sort</label>
                <select>
                  <option>Price Low to High</option>
                  <option>Price High to Low</option>
                </select>
              </div>

              <div className="view-icons">
                <button className="icon-btn active">▦</button>
                <button className="icon-btn">☰</button>
              </div>
            </div>
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>

          <Pagination />
        </div>
      </div>
      <Footer />
    </>
  );
}
