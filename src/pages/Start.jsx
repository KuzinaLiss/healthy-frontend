import React from "react";
import {About} from "../pages/StartPage/about";
import {Star} from "../pages/StartPage/start";
import {Work} from "../pages/StartPage/work";
import {Contact} from "../pages/StartPage/contact";
import styles from "././StartPage/StartPage.module.scss";




export const Start = () => {
 


    return (
        <div id={styles.contentContainer}>

          <Star />
          <About />
          <Work  />
          <Contact />
       
          
        </div>
      );
 };
