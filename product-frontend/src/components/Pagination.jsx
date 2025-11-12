
import "../App.css";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        &laquo; Prev
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          className={currentPage === idx + 1 ? "active" : ""}
          onClick={() => goToPage(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
