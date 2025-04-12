const Pagination = ({ materialsTotal, postPerpage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(materialsTotal / postPerpage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page, index) => (
        <button
          onClick={() => {
            setCurrentPage(page);
          }}
          className="btn page-item"
          key={index}
        >
          {page}{" "}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
