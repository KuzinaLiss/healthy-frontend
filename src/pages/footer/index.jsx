import React from "react";
import styles from "../footer/footer.module.scss";
import vk from "././image/vk.png";
import telegram from "././image/telegram.png";
import twitter from "././image/twitter.png";

export const Footer = () => {
    return (
      <div className={styles.footer_wrapper}>
        <div className={styles.footer_section_one}>
          <div className={styles.footer_logo_container}>
          <h1 className={styles.primary_heading}>HEALTHY</h1>
          </div>
          <div className={styles.footer_icons}>
           <img src={vk}/>
           <img src={telegram}/>
           <img src={twitter}/>
          </div>
        </div>
        <div className={styles.footer_section_two}>
        
          <div className={styles.footer_section_columns}>
            <span>244-5333-7783</span>
            <span>hello@healthy.com</span>
            <span>press@healthy.com</span>
            <span>contact@healthy.com</span>
          </div>
          <div className={styles.footer_section_columns}>
            <span>Sport & Food</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    );
  };