import React, { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from "../../redux/slices/comment";
import styles from "./AddComment.module.scss";
import axios from "../../axios"; 
import { selectIsAuth } from '../../redux/slices/auth';
import { selectIsPosts } from '../../redux/slices/posts';
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = ({avatarUrl}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isPost = useSelector(selectIsPosts);
  const [content, setContent] = React.useState('');
;
  useEffect(() => {
    // При монтировании компонента загружаем комментарии для данного поста
  
    dispatch(fetchComments(id));
  }, [dispatch]);

  const handleSubmitComment = async () => {
    try {
      // Отправка комментария на сервер
      const response = await axios.post(`/posts/${id}/comment`, {
        content: content // Отправка содержимого комментария
      });
      // Обработка успешной отправки комментария
      console.log("Комментарий успешно отправлен:", response.data);
      // Очистка поля ввода
      setContent("");
      // После успешной отправки комментария загружаем обновленные комментарии
      dispatch(fetchComments(id));
    } catch (error) {
      // Обработка ошибки при отправке комментария
      console.error("Ошибка при отправке комментария:", error);
      alert('Ошибка при отправке комментария!');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={avatarUrl}/>
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={content} // Привязка к состоянию введенного комментария
            onChange={(e) => setContent(e.target.value)} // Обработчик изменений в поле ввода
          />
          <Button variant="contained" onClick={handleSubmitComment}>Отправить</Button>
        </div>
      </div>
    </>
  );
};