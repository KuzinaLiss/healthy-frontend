import React from "react";
import {Link} from 'react-router-dom';
import styles from "../about/About.module.scss";
import about_image from "../image/about_image.png";


 export const About = () => {
    return (
      
      <div  className={styles.about_section_container}>
      
      <div className={styles.about_section_image_container}>
        <img src={about_image} alt="" />
      </div>
      <div className={styles.about_section_text_container}>
        
        <h1 className={styles.primary_heading}>
          Хочешь красивое и подтянутое тело?
        </h1>
        <p className={styles.primary_text}>
          Healthy подберёт вам план тренировок и предоставит вам доступ к статьям специалистов.
        </p>
        
        <div className={styles.about_buttons_container}>
        <Link to="/login">
          <button className={styles.secondary_button}>Войти</button>
        </Link>
        </div>
      </div>
    </div>
    );
  };
  
