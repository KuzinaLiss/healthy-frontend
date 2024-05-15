import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, fetchPost} from "../../redux/slices/posts";
import { Post } from "../../components/Post";
import styles from "./PostToTags.module.scss";

export const PostToTags = () => {
    const { name } = useParams(); // Получаем имя тега из URL
    const { posts } = useSelector((state) => state.posts);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const dispatch  = useDispatch();

    React.useEffect(() => {
        dispatch(fetchPost());
        
      }, []);
  
    useEffect(() => {
        console.log("Name:", name);
        console.log("All Posts:", posts.items);
      // Фильтруем статьи по выбранному тегу
      const filtered = posts.items.filter(post => post.tags.includes(name));
      console.log("Filtered Posts:", filtered);
      setFilteredPosts(filtered);
      
    }, [name, posts]);

    console.log(filteredPosts);
  
    return (
      <div className={styles.root_tag}>
        <h2 className={styles.primary_heading}>Статьи с тэгом "{name}"</h2>
        {filteredPosts.length === 0 ? (
          <p>Нет статей с выбранным тегом.</p>
        ) : (
          filteredPosts.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              imageUrl={post.imageUrl}
              title={post.title}
              user={post.user}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={3} // Замените на реальное количество комментариев
              tags={post.tags}
              isEditable={false} // Предположим, что статьи по тегам не редактируются
            />
          ))
        )}
      </div>
    );
  };
