import React, { useEffect, useMemo, useState } from 'react';
import '../src/App.scss';
import PostList from './copmponents/PostList'
import PostForm from './copmponents/PostForm';
import { Filter } from './copmponents/PostFilter';
import { options } from './consts/selectOptions.const';
import { ModalWidowForms } from './UI/modal/ModalWidowForms';
import Button from './UI/button/button';
import { usePosts } from './hooks/usePosts';
import PostItemInterface from './interfaces/postItem.interface';
import PostService from './API/PostService';
import Loader from './UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';

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
  const [posts, setPosts] = useState<PostItemInterface[]>(
    []
  );

  const [filter, setfilter] = useState<FiletrParameters>({sort: 'defaultValue', query: ''})
  const [modal, setModal] = useState(false)
  // const [isPostsLoading, setIsPostsLoading] = useState(false)
  const [fetchPosts, isPostLoading, postError] = useFetching( async () => {
    const newPosts = await PostService.getMessage();
    setPosts([...posts, ...newPosts]);
  })
  

	useEffect(() => {
		const renderData = JSON.parse(localStorage.getItem('renderData')  as string) || [];
		if (renderData) {
			setPosts(renderData);
		}
	}, []);


	useEffect(() => {
		localStorage.setItem('renderData', JSON.stringify(posts));
	}, [posts]);

    const searchPosts = (evt: any) => {
    setfilter({...filter, query: evt.target.value})
  }

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const createPost = function(newPost: any):void {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post: any):void => {
    setPosts(posts.filter((p: any)=> p.id !== post.id))
  }

  const sortPostList = (sort: keyof PostItemInterface) => {
    setfilter({...filter, sort: sort})
    setPosts([...posts].sort((a: PostItemInterface, b: PostItemInterface): number => (a[sort] > b[sort] ? 1 : -1)))
  }

  const removeAllPosts = ()=> {
    setPosts([])
  }
   return (
    <div className="App">
      <ModalWidowForms visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </ModalWidowForms>
      <div className='button_margin'>
        <Button onClick={() => setModal(true)}>Создать сообщение</Button>
      </div>
      <div className='button_margin'>
        <Button onClick={fetchPosts}>Выгрузить посты</Button>
      </div>
      <div className='button_margin'>
        <Button onClick={removeAllPosts}>Удалить все посты</Button>
      </div>
      <hr style={{margin: "15px 0",  width: "100%"}}></hr>
      <Filter
      options={options}
      searchPosts={searchPosts}
      value={filter.sort}
      valueInput={filter.query}
      sortPostList={sortPostList}/>
    
      {postError && <h1>Ошибка: {postError as string}</h1>}

      {isPostLoading
      ? <Loader/>
      : <PostList amountPosts={sortedAndSearchedPosts.length} removePost={removePost} postList={sortedAndSearchedPosts} title="Список сообщений"/>
      }
      

      
    </div>
  );
}

export default App;
// {
//   sortedAndSearchedPosts.length
//    ? 
//    :  
//    <div>Сообщения не найдены</div>
//   }