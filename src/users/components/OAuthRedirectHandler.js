import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../config/app-config';
import OauthLoadingPage from '../views/OauthLoadingPage';
import { setItem } from '../utils/storage';

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      // 2초 동안 로딩 상태를 유지합니다.
      await new Promise(resolve => setTimeout(resolve, 2000));

      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const storedState = sessionStorage.getItem('oauth_state');
      const provider = sessionStorage.getItem('oauth_provider');
  
      if (state !== storedState) {
        // console.error('OAuth state does not match');
        setError('OAuth state mismatch. Please try logging in again.');
        setIsLoading(false);
        return;
      }
  
      sessionStorage.removeItem('oauth_state');
      sessionStorage.removeItem('oauth_provider');

      try {
        const response = await fetch(`${API_BASE_URL}/oauth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, provider }),
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          if (data.accessToken) {
            localStorage.setItem('ACCESS_TOKEN', data.accessToken);
            // localStorage.setItem('USER_NICKNAME', data.nickName);
            // localStorage.setItem('USER_EMAIL', data.email);
            // setItem('ACCESS_TOKEN', data.accessToken);
            setItem('USER_NICKNAME', data.nickName);
            setItem('USER_EMAIL', data.email);

            if(data.refreshToken) setItem("REFRESH_TOKEN", data.refreshToken);
            if(data.provider) setItem("PROVIDER", data.provider);
            if(data.roleSet) setItem("USER_ROLESET", data.roleSet);
            navigate('/');
          } else {
            throw new Error('Token not received');
          }
        } else {
          const text = await response.text();
          throw new Error('Received non-JSON response from server');
        }
      } catch (error) {
        
      } finally {
        setIsLoading(false);
      }
    };

    handleOAuthRedirect();
  }, [navigate, location]);

  if (isLoading) {
    return <OauthLoadingPage />;
  }

  if (error) {
    return (
      <div>
        <p>로그인 완료!</p>
      </div>
    );
  }

  // 이 부분은 실행되지 않을 것입니다. 모든 경우가 위에서 처리됩니다.
  return null;
}

export default OAuth2RedirectHandler;