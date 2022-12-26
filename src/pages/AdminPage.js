import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { ProductForm, ProductList } from '../components/admin';
import {
  addProduct,
  auth,
  deleteProduct,
  editProduct,
  getAllProduct,
} from '../utils/useAPI';
import { useNavigate } from 'react-router-dom';

const Container = styled.div``;

const ProductWrap = styled.div`
  padding: 20px;
`;
export const Title = styled.strong`
  font-size: 20px;
  display: block;
`;

const AdminPage = () => {
  const history = useNavigate();
  const [user, setUser] = useState({});
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

  // const imgToBase64 = async (files) => {
  //   if (!files) return '';
  //   if (files.length === 1) {
  //     const file = files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     return new Promise((resolve) => {
  //       reader.onload = () => {
  //         resolve(reader.result);
  //       };
  //     });
  //   } else {
  //     return '';
  //   }
  // };

  // const onSubmit = async (data) => {
  //   console.log(data);
  //   data.thumbnailBase64 = await imgToBase64(data.thumbnailBase64);
  //   data.photoBase64 = await imgToBase64(data.photoBase64);
  //   data.tags = [];

  //   data.tags.push(data['brand']);
  //   data.tags.push(data['type']);
  //   delete data['brand'];
  //   delete data['type'];
  //   let newData;
  //   if (isEdit) {
  //     console.log(data);
  //     //newData = await editProduct();
  //   } else {
  //     newData = await addProduct(true, data);
  //   }
  //   setProductList([...productList, newData]);
  //   setFormToggle(false);
  //   setIsEdit(false);
  // };

  const deleteItem = async (id) => {
    await deleteProduct(true, id);
    setProductList(productList.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <Header user={user} />
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
          <ProductForm
            productList={productList}
            setProductList={setProductList}
            setFormToggle={setFormToggle}
          />
        ) : (
          ''
        )}
        <ProductList
          productList={productList}
          setProductList={setProductList}
          deleteItem={deleteItem}
        />
      </ProductWrap>
    </Container>
  );
};

export { AdminPage };
