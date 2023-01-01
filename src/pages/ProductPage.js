import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { ProductForm, ProductList } from '../components/admin';
import { addProduct, auth, deleteProduct, editProduct, getAllProduct } from '../utils/useAPI';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const history = useNavigate();
  const [productList, setProductList] = useState([]);
  const [formToggle, setFormToggle] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await auth();
      setUser(user);
      if (Object.keys(user).length == 0) {
        alert('로그인을 먼저 해주세요!');
        history('/admin/login');
      }
    };
    getUser();
    const getState = async () => {
      const products = await getAllProduct(true);
      setProductList(products);
    };
    getState();
  }, []);

  const deleteItem = async (id) => {
    await deleteProduct(true, id);
    setProductList(productList.filter((item) => item.id !== id));
  };
  return (
    <Container>
      <ProductWrap>
        <Title>제품</Title>
        <button
          onClick={() => {
            setFormToggle(!formToggle);
          }}
        >
          제품 추가하기
        </button>
        {formToggle ? (
          <ProductForm productList={productList} setProductList={setProductList} setFormToggle={setFormToggle} />
        ) : (
          ''
        )}
        <ProductList productList={productList} setProductList={setProductList} deleteItem={deleteItem} />
      </ProductWrap>
    </Container>
  );
};

const Container = styled.div``;

const ProductWrap = styled.div`
  padding: 20px;
`;
const Title = styled.strong`
  font-size: 20px;
  display: block;
`;
export { ProductPage };
