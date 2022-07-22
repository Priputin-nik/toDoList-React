import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import Button from '../UI/button/button';
import Input from '../UI/input/input';


export interface Post  {
    title: string
    body: string
  }


const PostForm = React.memo(({create}:any) => {
    
    const [post, setPost]: [Post, Dispatch<SetStateAction<Post>>] = useState({
        title: '',
        body: ''
      });

      const createNewPost = (e: SyntheticEvent) => {
        e.preventDefault();
        const newPost = {
          title: post.title,
          body: post.body,
          id: Number(new Date())
        }
        
        setPost({
          title: '',
          body: ''
        })

        create(newPost)
      };

  return (
    <form className="formGroup">
        <Input
        value={post.title}
        onChange={(e: React.FormEvent<HTMLInputElement>) => 
            setPost({...post, title: e.currentTarget.value})}
        
        type="text"
        placeholder="Заголовок"/>
        <Input
        value={post.body}
        onChange={(e: React.FormEvent<HTMLInputElement>) => 
            setPost({...post, body: e.currentTarget.value})}
        className="uiInput"
        type="text"
        placeholder="Содержание сообщения"/>
        <Button disabled={!post.title} type="submit" onClick={createNewPost}>
            Отправить сообщение
        </Button>
      </form>
  )
})

export default PostForm