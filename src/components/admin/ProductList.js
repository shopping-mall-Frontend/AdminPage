import React, { useEffect, useState } from 'react';
import { ProductItem } from './ProductItem';
import styled from 'styled-components';
import Page from '../Page';

const ProductList = React.memo(({ productList, setProductList, deleteItem }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const maxPage = Math.ceil(productList.length / limit);

  useEffect(() => {
    setCount((page - 1) * limit);
  }, [page]);

  return (
    <ProductUl>
      <Title>현재 제품 리스트</Title>
      등록된 제품 총 개수: {productList.length}
      <p>page: {page} </p>
      <div>
        <TableHeader>
          <p>이미지</p>
          <div className="info-wrap">
            <p>매진 여부</p>
            <p className="brand">브랜드</p>
            <p className="title">타이틀</p>
            <p>가격</p>
          </div>
          <p className="option">도구</p>
        </TableHeader>
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
      <div className="page-wrap">
        <Page page={page} maxPage={maxPage} setPage={setPage} />
      </div>
    </ProductUl>
  );
});

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
  .page-wrap {
    margin: 20px 0;
  }
`;

const Title = styled.strong`
  font-size: 20px;
  display: block;
`;

const TableHeader = styled.li`
  width: 100%;
  position: relative;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  .info-wrap {
    width: 65%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    p {
      width: 10%;
      white-space: nowrap;
      display: block;
    }
    .brand {
      width: 20%;
    }
    .title {
      width: 40%;
    }
  }
  .option {
    display: block;
    width: 20%;
  }
`;

export { ProductList };
