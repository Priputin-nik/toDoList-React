import React from 'react'
import Input from '../UI/input/input'
import { Select } from '../UI/select/select'

export const Filter = ({options, sortPostList, searchPosts}: any) => {
  return (
    <div className="formContainer">
    <Select options={options} sortPostList={sortPostList} />
    <div><Input placeholder="Поиск" onChange={(evt: React.FormEvent<HTMLInputElement>) => searchPosts(evt)}/></div>
  </div>
  )
}
