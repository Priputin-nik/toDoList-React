import React, { memo, useState } from 'react';
import PostItemInterface from '../interfaces/postItem.interface';
import PostItem from './PostItem';
import ReactDOM from "react-dom";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

const PostList = React.memo( function(props: any) {

    return (
    <div className="postList">
        <h1 style={{textAlign: 'center'}}>
        {props.title}
        </h1>
        
        <div>
        <TransitionGroup className="todo-list">
            {props.postList.map((post: PostItemInterface, index: number) =>
             <CSSTransition
             key={post.id}
             timeout={500}
             classNames="post"
           >
                <PostItem
                number={index + 1}
                post={post}
                remove={props.removePost}/>
            </CSSTransition>
            )}
            </TransitionGroup>
        </div>
    </div>
    )
})

export default PostList