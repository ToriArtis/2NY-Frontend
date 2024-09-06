import React, { useState } from 'react';
import WhiteButton from '../../../component/WhiteButton';
import { verifyPassword } from '../../api/userApi';
import Input from './Input'; 
import { getItem } from '../../utils/storage';


export default function PasswordVaild({ onVerify }) {
    const [password, setPassword] = useState('');
    const email = getItem("USER_EMAIL");
    const passwordVaild = {
      email: email,
      password: password
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const isValid = await verifyPassword(passwordVaild);
        onVerify(isValid);
      } catch (error) {
        console.error('Error during password verification:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} style={{ padding: '5rem 2rem' }} >
        <h2>비밀번호 재확인</h2>
        <div className="input-box">
          <div>
            <p>이메일</p>
            <Input
              // label="Email"
              type="email"
              id="email"
              value={email}
              readOnly
            />
          </div>
          <div>
            <p>비밀번호</p>
            <Input
              // label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password-button">
              <WhiteButton className="button" type="submit" btnName="확인" />
            </div>
          </div>
        </div>
      </form>
    );
  }