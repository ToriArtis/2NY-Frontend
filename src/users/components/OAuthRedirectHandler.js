import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../config/app-config';

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const storedState = sessionStorage.getItem('oauth_state');
      const provider = sessionStorage.getItem('oauth_provider');
  
      console.log('Received state:', state);
      console.log('Stored state:', storedState);
  
      if (state !== storedState) {
        console.error('OAuth state does not match');
        setError('OAuth state mismatch. Please try logging in again.');
        return;
      }
  
      sessionStorage.removeItem('oauth_state');
      sessionStorage.removeItem('oauth_provider');

      try {
        console.log(`Sending request to ${API_BASE_URL}/oauth/token`);
        console.log('Request payload:', { code, provider });

        const response = await fetch(`${API_BASE_URL}/oauth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, provider }),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          console.log('Response data:', data);
          if (data.accessToken) {
            // ACCESS_TOKEN 저장
            localStorage.setItem('ACCESS_TOKEN', data.accessToken);
            
            localStorage.setItem('USER_NICKNAME', data.nickName);
            localStorage.setItem('USER_EMAIL', data.email);

            if(data.refreshToken) localStorage.setItem("REFRESH_TOKEN", data.refreshToken);
            if(data.provider) localStorage.setItem("PROVIDER", data.provider);
    
            if(data.roleSet) localStorage.setItem("USER_ROLESET", data.roleSet);
            navigate('/');
          } else {
            throw new Error('Token not received');
          }
        } else {
          const text = await response.text();
          console.error('Received non-JSON response:', text);
          throw new Error('Received non-JSON response from server');
        }
      } catch (error) {
        console.error('Login failed:', error);
        setError(error.message);
      }
    };

    handleOAuthRedirect();
  }, [navigate, location]);

  if (error) {
    return (
      <div>
        <h2>Login Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/login')}>Return to Login</button>
      </div>
    );
  }

  return <div>Processing login...</div>;
}

export default OAuth2RedirectHandler;