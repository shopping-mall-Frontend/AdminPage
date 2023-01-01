import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { Link, Outlet } from 'react-router-dom';
import { auth } from '../utils/useAPI';

const AdminPage = () => {
  const [user, setUser] = useState({});
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
  }, []);
  return (
    <>
      <Header user={user} />
      <Container>
        <SideBarWrap aria-labelledby="my page navigation">
          <ul>
            <p>Menu</p>
            <StyeldLink to="/admin/products">
              <button>제품 관리</button>
            </StyeldLink>
            <StyeldLink to="/admin/order">
              <button>주문 내역 관리</button>
            </StyeldLink>
          </ul>
        </SideBarWrap>
        <ContentsDiv>
          <Outlet />
        </ContentsDiv>
      </Container>
    </>
  );
};

const Container = styled.main`
  display: flex;
  gap: 50px;
  margin: 0 auto;

  h2 {
    margin-bottom: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;
    font-size: 25px;
  }
`;
const ContentsDiv = styled.div`
  box-shadow: 3px 3px 5px 1px gray;
  margin: 20px;
`;

const SideBarWrap = styled.div`
  margin: 20px;
  margin-right: 0;
  padding: 20px;
  box-shadow: 3px 3px 5px 0px gray;
  p {
    font-size: 30px;
  }
`;

const StyeldLink = styled(Link)`
  min-width: 200px;
  display: block;
  margin-top: 10px;
  padding: 15px 10px;
  box-shadow: 3px 3px 5px 0px gray;
  transition: 0.5s all;
  button {
    border: none;
    background-color: rgba(255, 255, 255, 0);
    cursor: pointer;
  }
  &:hover {
    background-color: #868e96;
    button {
      color: white;
    }
  }
`;

export { AdminPage };
