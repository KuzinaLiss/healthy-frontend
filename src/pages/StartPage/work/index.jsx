import React from "react";
import styles from "../work/Work.module.scss";
import fitnes from "../work/image/fitnes.png";
import trener from "../work/image/trener.png";
import dietolog from "../work/image/dietolog.png";

export const Work = () => {
  const workInfoData = [
    {
      image: fitnes,
      title: "Фитнес-тренер",
      name:"Минина Татьяна Олеговна.",
      text: "Мастер спорта по пауэрлифтингу.",
    },
    {
      image: trener,
      title: "Тренер",
      name: "Иванов Иван Иванович.",
      text: "Тренер по направлению кросфит.",
    },
    {
      image: dietolog,
      title: "Диетолог",
      name: "Ивлеева Анна Васильевна.",
      text: "Квалифицированный диетолог со стажем.",
    },
  ];
  return (
    <div className={styles.work_section_wrapper}>
      <div className={styles.work_section_top}>
        
        <h1 className={styles.primary_heading}>Наши специалисты</h1>
        <p className={styles.primary_text}>
          Будут поддерживать и сопровождать вас на протяжении всего пути к вашей мечте.
        </p>
      </div>
      <div className={styles.work_section_bottom}>
        {workInfoData.map((data) => (
          <div className={styles.work_section_info} key={data.title}>
            <div className={styles.info_boxes_img_container}>
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p><b>{data.name}</b></p>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


