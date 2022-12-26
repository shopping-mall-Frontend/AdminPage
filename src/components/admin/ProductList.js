import React, { useEffect, useState } from 'react';
import { ProductItem } from './ProductItem';
import styled from 'styled-components';
import { Title } from '../../pages';

const ProductUl = styled.ul`
  padding: 20px;
  span {
    display: block;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

const Page = ({ page, maxPage, setPage }) => {
  const limit = 3;
  const [pageIndex, setPageIndex] = useState(limit);
  useEffect(() => {}, [page]);
  return (
    <div>
      <button onClick={() => setPage(1)}>Fir</button>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        ◀
      </button>
      {Array(limit)
        .fill()
        .map((data, i) => (
          <button
            key={page + i}
            onClick={() => setPage(page + i)}
            aria-current={page === page + i ? 'page' : null}
            disabled={page + i > maxPage}
          >
            {page + i}
          </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === maxPage}>
        ▶
      </button>
      <button onClick={() => setPage(maxPage)}>End</button>
    </div>
  );
};

const ProductList = React.memo(
  ({ productList, setProductList, deleteItem }) => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const maxPage = Math.ceil(productList.length / limit);

    useEffect(() => {
      setCount((page - 1) * limit + 1);
    }, [page]);

    return (
      <ProductUl>
        <Title>현재 제품 리스트</Title>
        등록된 제품 총 개수: {productList.length}
        <p>page: {page} </p>
        <div>
          <Page page={page} maxPage={maxPage} setPage={setPage} />
        </div>
        <div>
          {productList.length === 0 ? (
            <p>등록한 제품이 없습니다!</p>
          ) : (
            productList.slice(count, count + limit).map((item) => {
              return (
                <ProductItem
                  key={item.id}
                  item={item}
                  deleteItem={deleteItem}
                  productList={productList}
                  setProductList={setProductList}
                />
              );
            })
          )}
        </div>
      </ProductUl>
    );
  }
);

export { ProductList };
