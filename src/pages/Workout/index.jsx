import React, { useState } from "react";
import styles from "../Workout/Workout.module.scss";
import body from "../Workout/image/body.png";
import foot from "../Workout/image/foot.png";
import press from "../Workout/image/press.png";
import hand from "../Workout/image/hand.png";
import { Link, useNavigate } from 'react-router-dom';
import { WorkoutBlock } from "../WorkoutBlock/index";

export const Workout = () => {
  

  return (
    <div>
      <div className={styles.cards_title}>
        <label>Выбери свой план тренировок</label>
      </div>
      <div className={styles.cards_container}>
        <div className={styles.card}>
          <img src={body}/>
          <h3 className={styles.title_body}>тренировка всего тела</h3>
          <Link to="/workout/block/Все тело/Block_1" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 1</button>
          </Link>
          <Link to="/workout/block/Все тело/Block_2" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 2</button>
          </Link>
          <Link to="/workout/block/Все тело/Block_3" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 3</button>
          </Link>
        </div>
        <div className={styles.card}>
          <img src={foot}/>
          <h3 className={styles.title_foot}>тренировка ног</h3>
          <Link to="/workout/block/Ноги/Block_1" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 1</button>
          </Link>
          <Link to="/workout/block/Ноги/Block_2" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 2</button>
          </Link>
          <Link to="/workout/block/Ноги/Block_3" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 3</button>
          </Link>
        </div>
        <div className={styles.card}>
          <img src={press}/>
          <h3 className={styles.title_foot}>тренировка пресса</h3>
          <Link to="/workout/block/Пресс/Block_1" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 1</button>
          </Link>
          <Link to="/workout/block/Пресс/Block_2" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 2</button>
          </Link>
          <Link to="/workout/block/Пресс/Block_3" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 3</button>
          </Link>
        </div>
        <div className={styles.card}>
          <img src={hand}/>
          <h3 className={styles.title_foot}>тренировка рук</h3>
          <Link to="/workout/block/Руки/Block_1" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 1</button>
          </Link>
          <Link to="/workout/block/Руки/Block_2" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 2</button>
          </Link>
          <Link to="/workout/block/Руки/Block_3" className={styles.linkWithoutUnderline}>
          <button className={styles.secondary_button}>Блок 3</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
