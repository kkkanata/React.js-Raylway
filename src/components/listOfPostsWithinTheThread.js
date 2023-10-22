
import React, { useState, useEffect, useCallback } from 'react';

const ListOfPostsWithinTheThread = ({ threadId }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback (async () => {
    try {
      const response = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threadId}/posts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }, [threadId]);
  // スレッド内の投稿を取得するための処理（ここでは仮のデータを使用）
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    fetchData(); // fetchPosts 関数を含む fetchData を呼び出す

  }, [threadId, fetchPosts]); // threadId と fetchPosts を依存関係のリストに追加

  return (
    <div>
      <h2>スレッド {threadId} の投稿一覧</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.post}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfPostsWithinTheThread;





