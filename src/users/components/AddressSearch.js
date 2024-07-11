import React, { useState, useEffect } from 'react';
import { key } from '../../Config';


const AddressSearch = () => {
  const [address, setAddress] = useState({
    zipcode: '',
    roadAddress: '',
    jibunAddress: '',
    detailAddress: '',
  });

  const handlePostCode = () => {
    const config = {
      apiUrl: 'https://www.juso.go.kr/addrlink/addrLinkUrl.do',
      confmKey: key,
      returnUrl: 'http://localhost:3000',
      resultType: 4,
    };

    const url = `${config.apiUrl}?confmKey=${config.confmKey}&returnUrl=${config.returnUrl}&resultType=${config.resultType}`;
    window.open(url, 'popup', 'width=570,height=450,scrollbars=yes,resizable=yes');
  };

  const receiveMessage = (event) => {
    if (typeof event.data === 'string') {
      const dataParts = event.data.split(',');
      if (dataParts.length >= 3) {
        setAddress({
          zipcode: dataParts[0],
          roadAddress: dataParts[1],
          jibunAddress: dataParts[2],
          detailAddress: '',
        });
      } else {
        console.error('Received data is not in the expected format:', event.data);
      }
    } else {
      console.error('event.data is not a string:', event.data);
    }
  };

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => {
      window.removeEventListener('message', receiveMessage, false);
    };
  }, []);

  const handleDetailAddressChange = (e) => {
    setAddress(prev => ({ ...prev, detailAddress: e.target.value }));
  };

  return (
    <div>
      <h1>도로명주소 검색</h1>
      <button onClick={handlePostCode}>우편번호 찾기</button>
      <div>
        <p>우편번호: {address.zipcode}</p>
        <p>도로명 주소: {address.roadAddress}</p>
        <p>지번 주소: {address.jibunAddress}</p>
        <input
          type="text"
          value={address.detailAddress}
          onChange={handleDetailAddressChange}
          placeholder="상세 주소를 입력하세요"
        />
      </div>
    </div>
  );
};

export default AddressSearch;