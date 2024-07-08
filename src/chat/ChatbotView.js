
// View.js (React Component)
import React, { useState, useEffect, useRef } from 'react';
import { ChatViewModel } from './ChatViewModel';
import './ChatbotView.css';

const ChatbotView = () => {
    // ViewModel 인스턴스를 생성하고 상태로 관리합니다.
    const [viewModel] = useState(() => new ChatViewModel());
    // 메시지 목록을 상태로 관리합니다.
    const [messages, setMessages] = useState([]);
    // 사용자 입력을 상태로 관리합니다.
    const [input, setInput] = useState('');
    // 메시지 목록의 끝을 참조하기 위한 ref를 생성합니다.
    const messagesEndRef = useRef(null);
  
    // 컴포넌트가 마운트될 때 ViewModel의 메시지 변경 콜백을 설정합니다.
    useEffect(() => {
      viewModel.setOnMessagesChanged(setMessages);
    }, [viewModel]);
  
    // 메시지 목록이 변경될 때마다 스크롤을 맨 아래로 이동시킵니다.
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    // 메시지 전송 함수
    const handleSend = () => {
      if (input.trim() === '') return;
      viewModel.sendMessage(input);
      setInput('');
    };
  
    return (
      <div className="chatbot">
        <div className="header">
        2NY : AI 챗봇이 바로 답변드려요
        </div>
        <div className="chat-messages">
          {/* 메시지 목록을 렌더링합니다. */}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
          </div>
          ))}
          {/* 스크롤을 위한 더미 요소 */}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          {/* 사용자 입력 필드 */}
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="메시지를 입력하세요..."
            />
          {/* 전송 버튼 */}
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    );
  };
  
  export default ChatbotView;