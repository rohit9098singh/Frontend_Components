import React from 'react';

import postData from './PostData';
import PostCard from './PostCard';

export type blogPostType={
    title: string,
    body: string,
    tags: string[],
   reactions: {
    likes: number
    dislikes: number
  }
  views: number
}

const BlogPost = () => {
  return (
    <div>
      {postData.map((post:blogPostType, index:number) => (
        <PostCard
          key={index}
          title={post.title}
          body={post.body}
          tags={post.tags}
          reactions={post.reactions}
          views={post.views}
        />
      ))}
    </div>
  );
};

export default BlogPost;
