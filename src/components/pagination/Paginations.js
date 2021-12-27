import { Pagination } from "react-bootstrap";

const Paginations = ({ totalCards, cardsPerPage, paginate, active }) => {
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
      {Math.ceil(totalCards / cardsPerPage) === 1 ? null : (
        <Pagination>{items}</Pagination>
      )}
    </>
  );
};
export default Paginations;
