import React from "react";
import {Link} from 'react-router-dom';
import styles from "../start/Star.module.scss";

import HomeBunnerImage from "../image/HomeBannerImage.png";

export const Star = () => {
  return (
    <div className={styles.home_container}>
      <div className={styles.home_banner_container}>
        <div className={styles.home_text_section}>
          <h1 className={styles.primary_heading}>
            Хочешь вкусно и правильно питаться?
          </h1>
          <p className={styles.primary_text}>
            Healthy поможет тебе составить свой список продуктов, добавить их в дневник питания и подсчитать калории.
          </p>
          <Link to="/register">
            <button className={styles.secondary_button}>
              Зарегистрироваться сейчас {" "}
            </button>
          </Link>
        </div>
        <div className={styles.home_bannerImage_container}>
          <img src={HomeBunnerImage} alt="" />
        </div>
      </div>
    </div>
  );
};