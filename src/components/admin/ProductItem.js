import React, { useState } from 'react';
import styled from 'styled-components';
import { getProductDetail } from '../../utils/useAPI';
import { ProductDetail } from './ProductDetail';

const ProductItem = React.memo(({ item, deleteItem }) => {
  const [product, setProduct] = useState([]);
  const [toggle, setToggle] = useState(false);

  const getProductDetails = async (id) => {
    const newProduct = await getProductDetail(id);
    setProduct(newProduct);
  };

  const showProductDetail = async () => {
    await getProductDetails(item.id);
    setToggle(true);
  };

  return (
    <>
      <ProductLi key={item.id}>
        <ItemHeaderDiv>
          <button
            onClick={() => {
              deleteItem(item.id);
            }}
          >
            삭제하기
          </button>
          <button
            onClick={() => {
              showProductDetail();
            }}
          >
            상세정보 보기
          </button>
        </ItemHeaderDiv>
        <ItemInfoDiv>
          <span>{item.tags[0]}</span>
          <span>{item.title}</span>
          <span>{item.price}원</span>
        </ItemInfoDiv>
        {item.thumbnail ? (
          <ItemImgDiv>
            <img alt="상품 이미지" src={item.thumbnail} />
          </ItemImgDiv>
        ) : (
          ''
        )}
      </ProductLi>
      {toggle ? (
        <ProductDetail item={product} toggle={toggle} setToggle={setToggle} />
      ) : (
        ''
      )}
    </>
  );
});

const ProductLi = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid red;
  margin-bottom: 20px;
  padding: 25px;
`;

const ItemImgDiv = styled.div`
  display: flex;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ItemInfoDiv = styled.div``;

const ItemHeaderDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
export { ProductItem };
