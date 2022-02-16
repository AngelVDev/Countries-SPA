import { React } from "react";

const Pagination = ({ countriesPage, allCountries, pagination }) => {
  let pageNumbers = [];

  for (let i = 1; i < Math.ceil(allCountries / countriesPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers &&
        pageNumbers.map((n) => (
          <button key={n} onClick={() => pagination(n)}>
            {n}
          </button>
        ))}
    </nav>
  );
};

export default Pagination;
