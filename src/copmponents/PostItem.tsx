import React, { useState } from 'react';


const PostItem = function(props:any) {


return (
    <div className="post post_margin">
        <div className="post__content">
          <strong>{props.number}. {props.post?.title}</strong>
          <div className="post__body"> 
            {props.post?.body}
          </div>
        </div>
        <div className="post__btns">
            <button onClick={(e) => props.remove(props.post)}>Удалить</button>
        </div> 
      </div>
)
}

export default PostItem