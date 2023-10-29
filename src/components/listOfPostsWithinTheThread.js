import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import CreatePostButton from './createPostButton';

const ListOfPostsWithinTheThread = ({ threadTitle }) => {
  let { threadId } = useParams();
  const [postResponse, setPosts] = useState([]);
  const [error, setError] = useState();


  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threadId}/posts`);
      if (!response.ok) {
        // サーバーサイドからのエラーレスポンスをJSONとして取得
        const errorResponse = await response.json();
  
        // エラーコードに応じてエラーメッセージを生成
        if (errorResponse.ErrorCode === 400) {
          setError(errorResponse.ErrorMessageJP); // 400: バリデーションエラー
        } else if (errorResponse.ErrorCode === 404) {
          setError(errorResponse.ErrorMessageJP); // 404: そのスレッドは存在しません。
        } else if (errorResponse.ErrorCode === 500) {
          setError(errorResponse.ErrorMessageJP); // 500: サーバでエラーが発生しました。
        } else {
          setError('Unknown error');
        }
        return [];
      }
  
      const data = await response.json();
      console.log(data);
      setError(null); // エラーが解消された場合、エラーステートをクリア
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Network error');
      return [];
    }
  }, [threadId]);
  
  // スレッド内の投稿を取得するための処理
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    fetchData(); // fetchPosts 関数を含む fetchData を呼び出す
  }, [threadId, fetchPosts]); // threadId と fetchPosts を依存関係のリストに追加

  return (
    <div>
      <h2>{threadTitle} スレッドの投稿一覧</h2>
      {error ? (
        <p>エラー: {error}</p>
      ) : postResponse && postResponse.posts && postResponse.posts.length > 0 ? (
        <ul>
          {postResponse.posts.map((post) => ( //postResponse中のpost配列をmapで回す。配列で無いと表示された原因はpostResponse自体をmapで処理しようとしたため
            <li key={post.id}>{post.post}</li>
          ))}
        </ul>
      ) : (
        <p>投稿がありません</p>
      )}
      <div>
        <CreatePostButton threadId={threadId} />
      </div>
    </div>
  );}
export default ListOfPostsWithinTheThread;
