import React, { useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth} from "../../pages/Login";
import { logout, setUserRole, selectUserRole} from "../../redux/slices/auth";

export const Header = () => {

const disapatch = useDispatch();
const isAuth = useSelector(selectIsAuth);
const userRole = useSelector(selectUserRole);

useEffect(() =>{
  disapatch(setUserRole("user"));
}, [disapatch]);

console.log("userRole:", userRole); 

const onClickLogout = () => {
  if(window.confirm('Вы действительно хотите выйти?')){
    disapatch(logout());
    window.localStorage.removeItem('token');
  }
};

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          {isAuth ? (
            <Link className={styles.logo} to="/home">
            <div>Healthy</div>
          </Link>
          ):(
            <Link className={styles.logo} to="/">
            <div>Healthy</div>
          </Link>
          )}
          
          <div className={styles.buttons}>
          {isAuth ? (
  <>
    {userRole !== 'user' && (
      <>
       <Link to="/add-post">
        <Button variant="contained">Написать статью</Button>
      </Link>
      <Link to="/add-workout">
        <Button variant="contained">Добавить тренировку</Button>
      </Link>
      <Link to="/workout">
        <Button variant="contained">Спорт</Button>
      </Link>
      </>
     
    )}
    {userRole === 'user' && (
      <>
      <Link to="/calculation">
        <Button variant="contained">Питание</Button>
      </Link>
      <Link to="/workout">
        <Button variant="contained">Спорт</Button>
      </Link>
    </>
    )}
    <Link to="/">
      <Button onClick={onClickLogout} variant="contained" color="error">
        Выйти
      </Button>
    </Link>
  </>
) : (
  <>
    <Link to="/login">
      <Button variant="outlined">Войти</Button>
    </Link>
    <Link to="/register">
      <Button variant="contained">Создать аккаунт</Button>
    </Link>
  </>
)}
        </div>
        </div>
      </Container>
    </div>
  );
};
