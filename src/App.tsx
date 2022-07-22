import React, { useMemo, useState } from 'react';
import '../src/App.scss';
import PostList from './copmponents/PostList'
import PostForm from './copmponents/PostForm';
import { Filter } from './copmponents/PostFilter';
import { options } from './consts/selectOptions.const';
import PostItemInterface from './interfaces/postItem.interface';
import { ModalWidowForms } from './UI/modal/ModalWidowForms';
import Button from './UI/button/button';
import { usePosts } from './hooks/usePosts';

export interface Options {
  value: string,
  name: string
}

export type allSelectParameters = "defaultValue" | keyof PostItemInterface

export interface FiletrParameters {
sort: allSelectParameters,
query: string
}

function App() {
  const [posts, setPosts] = useState(
    [
      {id: 1, title: 'JS', body: 'Описание, описание, описание, описание'},
      {id: 3, title: 'JS', body: 'Описание, описание, описание, описание'},
      {id: 4, title: 'JS', body: 'Описание, описание, описание, описание'},
    ]
  );

  const [filter, setfilter] = useState<FiletrParameters>({sort: 'defaultValue', query: ''})
  const [modal, setModal] = useState(false)
  // const [selectedSort, setSelectedSort] = useState<"defaultValue" | "allMessage" | keyof PostItemInterface>("defaultValue")
  // const [searchQuery, setSearchQuery] = useState('')

  const searchPosts = (evt: any) => {
    setfilter({...filter, query: evt.target.value})
  }

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const createPost = function(newPost: any):void {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post: any):void => {
    setPosts(posts.filter(p=> p.id !== post.id))
  }

  const sortPostList = (sort: keyof PostItemInterface) => {
    setfilter({...filter, sort: sort})
    setPosts([...posts].sort((a: PostItemInterface, b: PostItemInterface): number => (a[sort] > b[sort] ? 1 : -1)))
  }

   return (
    <div className="App">
      <ModalWidowForms visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </ModalWidowForms>
      <div className='button_margin'>
        <Button onClick={() => setModal(true)}>Создать сообщение</Button>
      </div>
      <hr style={{margin: "15px 0",  width: "100%"}}></hr>
      <Filter
      options={options}
      searchPosts={searchPosts}
      value={filter.sort}
      valueInput={filter.query}
      sortPostList={sortPostList}/>
      {
      sortedAndSearchedPosts.length
      ? 
      <PostList removePost={removePost} postList={sortedAndSearchedPosts} title="Список сообщений"/>
      : 
      <div>Сообщения не найдены</div>
      }
      
    </div>
  );
}

export default App;
