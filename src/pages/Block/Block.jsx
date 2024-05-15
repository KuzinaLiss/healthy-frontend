import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./Block.module.scss";

import { fetchRemoveWorkout } from "../../redux/slices/workout";
import { selectUserRole } from "../../redux/slices/auth";

export const Block = ({
  _id,
  title,
  text,
  user,
  imageUrl,
  duration,
  difficulty,
  category,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);
  const [isHovered, setIsHovered] = useState(false);

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить тренировку?')) {
      dispatch(fetchRemoveWorkout(_id));
    }
  };


  return (
    <div
      className={styles.root}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageWrapper}>
        {imageUrl && (
          <img className={styles.image} src={`https://nifty-mellow-palm.glitch.me${imageUrl}`} alt={title} />
        )}
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <div className={styles.info}>
          <span className={styles.duration}>Длительность: {duration}</span>
        </div>
      </div>

      {(userRole === 'admin' && isHovered) && (
        <div className={styles.editButtons}>
          <Link to={`/workout/block/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};
