import { Pagination } from "react-bootstrap";

const Paginations = ({ totalCards, cardsPerPage, paginate, active }) => {
  // const pageNumber = [];
  // for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
  //   pageNumber.push(i);
  // }

  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(totalCards / cardsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
      {/* <nav>
        <ul className="pagination">
          {pageNumber.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav> */}
      <Pagination>{items}</Pagination>
    </>
  );
};
export default Paginations;
