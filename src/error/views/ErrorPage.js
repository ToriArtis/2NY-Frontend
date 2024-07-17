import React from 'react';
import { Link } from 'react-router-dom';
import '../../component/css/ErrorPage.css';

function ErrorPage({ statusCode, message }) {
    return (
        <div className="error-container">
            <div className="error-code">
                <span className="error-digit">{statusCode}</span>
            </div>
            <p>죄송합니다. 현재 찾을 수 없는 페이지를 요청하였습니다.</p>

            <div className='button-container'>
                <button className='main-link'>
                    <Link to="/">메인으로</Link>
                </button>
                <button className='back-link'>
                    <a href="#" onClick={() => window.history.back()}>이전페이지</a>
                </button>
            </div>
        </div>
    );
}

export default ErrorPage;