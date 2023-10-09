import React, { useState } from 'react';
import axios from 'axios';

const CreateThread = () => {
  const [threadTitle, setThreadTitle] = useState('');

  const handleTitleChange = (e) => {
    setThreadTitle(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // スレッドを作成するためのデータを準備
      const postData = {
        title: threadTitle,
      };

      // SwaggerHub APIにPOSTリクエストを送信
      const response = await axios.post(
        'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads',
        postData
      );

      // リクエストが成功した場合の処理
      console.log('新しいスレッドを作成:', response.data);
    } catch (error) {
      // リクエストが失敗した場合の処理
      console.error('エラー:', error);
    }
  };

  return (
    <div>
      <h1>新しいスレッドを作成</h1>
      <div>
        <label htmlFor="threadtitle">スレッドのタイトル:</label>
        <input type="text" id="threadtitle" value={threadTitle} onChange={handleTitleChange} />
      </div>
      <button onClick={handleSubmit}>作成</button>
    </div>
  );
};

export default CreateThread;
