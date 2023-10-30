import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewThreads = ({ setThreadsIdandTitle }) => {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate(); // navigate 関数を取得

  const threadClick = (threadId, threadTitle) => {
    setThreadsIdandTitle(threadTitle);
    navigate(`/thread/${threadId}`); // navigate を使用してリンク
  }

  const fetchThreads = async () => {
    try {
      const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchThreads().then(data => setThreads(data));
  }, []);

  return (
    <div>
      <h1>新着スレッド</h1>
      <ul>
        {threads.map((thread) => (
          <li className='App-link' key={thread.id}>
            <button onClick={() => threadClick(thread.id, thread.title)}>{thread.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewThreads;