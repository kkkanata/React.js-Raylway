import React, { useState } from 'react';
import axios from 'axios';

const CreatePostButton = ({ threadId }) => {
  const [postContent, setPostContent] = useState('');

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
        `https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threadId}/posts`,postData
      );

      // リクエストが成功した場合の処理
      console.log('新しい投稿を作成:', response.data);
    } catch (error) {
      // リクエストが失敗した場合の処理
      console.error('エラー:', error);
    }
  };

  return (
    <div>
      <h1>投稿する</h1>
      <div>
        <label htmlFor="postcontents">内容:</label>
        <input type="text" id="postcontents" value={postContent} onChange={handlePostContentChange} />
      </div>
      <button onClick={handleSubmit}>投稿する</button>
    </div>
  );
};

export default CreatePostButton;
