import React from "react";
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';
import styles from "./AddWorkout.module.scss";

export const AddWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');
  const [category, setCategory] = React.useState('');
  const inputFileRef = React.useRef(null);
  const difficultyOptions = ['Block_1', 'Block_2', 'Block_3'];
  const categoryOptions = ['Все тело', 'Ноги', 'Пресс', 'Руки'];

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/uploads', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      if (!title || !imageUrl || !duration || !text || !difficulty || !category) {
        throw new Error('Пожалуйста, заполните все обязательные поля');
      }

      const fields = {
        title,
        imageUrl: imageUrl.replace(/\s+/g, ''),
        duration,
        text,
        difficulty,
        category,
       
      };

      const { data } = isEditing
        ? await axios.patch(`/workouts/${id}`, fields)
        : await axios.post('/workouts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/workout`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании тренировки!');
    }
  };

  React.useEffect(() => {
    if (isEditing) {
      axios
        .get(`/workouts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setDuration(data.duration);
          setDifficulty(data.difficulty);
          setCategory(data.category);
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении тренировки!');
        });
    }
  }, [id, isEditing]);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: "myUniqueEditorId"
      },
    }),
    []
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`https://nifty-mellow-palm.glitch.me${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок тренировки..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      {/* Additional fields for workout */}
      <TextField
        variant="standard"
        placeholder="Длительность"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        fullWidth
      />
      <div className={styles.vibor}>
        {/* Комбобокс для выбора сложности */}
        <select className={styles.combo} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Выберите сложность</option>
          {difficultyOptions.map((difficultyOption) => (
            <option key={difficultyOption} value={difficultyOption}>{difficultyOption}</option>
          ))}
        </select>
      </div>
      <div className={styles.vibor}>
        {/* Комбобокс для выбора сложности */}
        <select className={styles.combo} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Выберите категорию</option>
          {categoryOptions.map((categoryOptions) => (
            <option key={categoryOptions} value={categoryOptions}>{categoryOptions}</option>
          ))}
        </select>
      </div>
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить изменения' : 'Опубликовать'}
        </Button>
        <Button onClick={() => navigate('/home')} size="large">Отмена</Button>
      </div>
    </Paper>
  );
};
