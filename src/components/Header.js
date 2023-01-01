import React from 'react';
import styled from 'styled-components';
import { auth } from '../utils/useAPI';

const Header = ({ user }) => {
  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    await auth('logout');
    window.location.reload();
  };
  return (
    <Container>
      <div className="logo">
        <h1>N4</h1>
        <p> Admin Page</p>
      </div>
      {user ? (
        <div>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              handleLogout();
            }}
          >
            logout
          </span>
        </div>
      ) : (
        <p>로그인해주세요!</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  .logo {
    display: flex;
    align-items: center;
    font-family: 'Marcellus', serif;
    text-decoration: none;
    font-size: 3.2rem;
    margin-right: 20px;
    p {
      padding-left: 20px;
      font-size: 30px;
    }
  }
  span {
    cursor: pointer;
  }
  box-shadow: 2px 2px 5px 1px gray;
`;

export { Header };
