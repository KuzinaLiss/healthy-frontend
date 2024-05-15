import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, selectComments, selectIsCommentsLoaded } from "../redux/slices/comment";
import {selectCurrentUserAvatarUrl} from "../redux/slices/auth";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const isCommentsLoaded = useSelector((state) => state.comments.status === "loaded"); // Определите, загружены ли комментарии
  const currentUserAvatarUrl = useSelector(selectCurrentUserAvatarUrl);
  console.log('URL аватарки:', currentUserAvatarUrl);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await axios.get(`/posts/${id}`);
        setData(postData.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        alert('Ошибка при загрузке данных!');
      }
    };
  
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("isLoading:", isLoading);

    dispatch(fetchComments(id));
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
console.log("com",comments);
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}/>
      </Post>
      
      <CommentsBlock items={comments} isLoading={!isCommentsLoaded || comments.length === 0}>
        <Index avatarUrl={currentUserAvatarUrl} />
      </CommentsBlock>
    </>
  );
};
