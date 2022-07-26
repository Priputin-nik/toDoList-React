import { useMemo } from "react";
import PostItemInterface from "../interfaces/postItem.interface";

export const useSortedPosts = (posts: any, sort: any): any => {
    const sortedPosts = useMemo(() => { 
        let sortV: keyof PostItemInterface;
        if (sort !== "defaultValue")
         {
          sortV=sort
          return [...posts].sort((a , b): number => (a[sortV] > b[sortV] ? 1 : -1))
        }
          return posts
      }, [sort, posts])
      return sortedPosts
}

export const usePosts = (posts: any, sort: any, query: any) => {
    const sortedPosts = useSortedPosts(posts, sort);
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((item: any) => item.title?.toLowerCase().includes(query))
      }, [query, sortedPosts])
      return sortedAndSearchedPosts
}
