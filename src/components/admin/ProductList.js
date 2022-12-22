import React from 'react';
import { ProductItem } from './ProductItem';
import styled from 'styled-components';

const ProductUl = styled.ul`
  padding: 20px;
  span {
    display: block;
  }
`;
const Title = styled.strong`
  font-size: 20px;
`;

const ProductList = React.memo(({ productList, deleteItem }) => {
  console.log('List');
  return (
    <ProductUl>
      <Title>현재 제품 리스트</Title>
      {productList.length === 0 ? (
        <p>등록한 제품이 없습니다!</p>
      ) : (
        productList.map((item) => (
          <ProductItem key={item.id} item={item} deleteItem={deleteItem} />
        ))
      )}
    </ProductUl>
  );
});

export { ProductList };
