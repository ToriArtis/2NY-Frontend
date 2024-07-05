import React, { useState } from 'react';
import WhiteButton from '../../../component/WhiteButton';
import { verifyPassword } from '../../api/userApi';
import Input from './Input'; 


export default function PasswordVaild({ onVerify }) {
    const [password, setPassword] = useState('');
    const email = localStorage.getItem("UESR_EMAIL");
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
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          readOnly
        />
        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <WhiteButton className="button" type="submit" btnName="확인" />
      </form>
    );
  }