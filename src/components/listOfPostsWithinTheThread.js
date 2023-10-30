import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ListOfPostsWithinTheThread = ({ threadTitle }) => {
  let { threadId } = useParams();
  const [postResponse, setPosts] = useState([]);
  const [error, setError] = useState();

  const [postContent, setPostContent] = useState(''); //button処理
  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
    };

    const handleSubmit = async () => {
      try {
        // スレッドを作成するためのデータを準備
        const postData = {
          post: postContent,
        };
  
        // SwaggerHub APIにPOSTリクエストを送信
        const response = await axios.post(
          `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`,postData
        );

              // リクエストが成功した場合の処理
        console.log('新しい投稿を作成:', response.data);

       // 新しい投稿が作成された後、最新の投稿を再取得
        const data = await fetchPosts();
        setPosts(data);
    } catch (error) {
      // リクエストが失敗した場合の処理
      console.error('エラー:', error);
    }
  }; 
  //ここまでbutton処理


  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`);
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
      console.log(data); //テスト
      setError(null); // エラーが解消された場合、エラーステートをクリア
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Network error');
      return [];
    }
  }, [threadId]);
  
  // スレッド内の投稿を取得するための処理
  useEffect(() => { //useEffectについて理解が進んでいない
    console.log("レンダリング");
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
      <div>
        <label htmlFor="postcontents">内容:</label>
        <input type="text" id="postcontents" value={postContent} onChange={handlePostContentChange} />
      </div>
      <button onClick={handleSubmit}>投稿する</button>
      </div>
    </div>
  );}
export default ListOfPostsWithinTheThread;
