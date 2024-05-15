import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import styles from "../contact/Contact.module.scss";

export const Contact = () => {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
  
    if (question.trim() !== "") {
      alert("Ваше сообщение успешно отправлено!");

    } else {
      alert("Ошибка. Для отправки сообщения необходимо ввести свой вопрос!");
     
    }
   
  };

 

  return (
    <div className={styles.contact_page_wrapper}>
      <h1 className={styles.primary_heading}>Нужна помощь?</h1>
      <h2 className={styles.primary_heading}>
        Задайте нам вопрос, и мы незамедлительно вам ответим
      </h2>
      <Container className={styles.contact_form_container}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              
              placeholder="Напишите свой вопрос"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>
        </Form>
       
      </Container>
      <Button className={styles.secondary_button} variant="primary" type="submit" onClick={handleSubmit}>
        Отправить
      </Button>
    </div>
  );
};