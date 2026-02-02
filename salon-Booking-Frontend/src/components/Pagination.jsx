import "../styles/PaginationExact.css";

export default function Pagination() {
  return (
    <div className="pagination-wrapper">
      <button className="page-btn">← Prev</button>

      <div className="page-numbers">
        <button className="page-number active">1</button>
        <button className="page-number">2</button>
        <button className="page-number">3</button>
        <button className="page-number">4</button>
      </div>

      <button className="page-btn">Next →</button>
    </div>
  );
}
