import React, { useState, useEffect } from 'react';

const AddressSearch = () => {
  const [address, setAddress] = useState({
    postcode: '',
    roadAddress: '',
    jibunAddress: '',
    detailAddress: '',
    extraAddress: '',
  });
  const [guide, setGuide] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleComplete = (data) => {
    let roadAddr = data.roadAddress;
    let extraRoadAddr = '';

    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
      extraRoadAddr += data.bname;
    }
    if (data.buildingName !== '' && data.apartment === 'Y') {
      extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
    }
    if (extraRoadAddr !== '') {
      extraRoadAddr = ' (' + extraRoadAddr + ')';
    }

    setAddress(prev => ({
      ...prev,
      postcode: data.zonecode,
      roadAddress: roadAddr,
      jibunAddress: data.jibunAddress,
      extraAddress: extraRoadAddr,
    }));

    if (data.autoRoadAddress) {
      const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
      setGuide(`(예상 도로명 주소 : ${expRoadAddr})`);
    } else if (data.autoJibunAddress) {
      const expJibunAddr = data.autoJibunAddress;
      setGuide(`(예상 지번 주소 : ${expJibunAddr})`);
    } else {
      setGuide('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const openDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: handleComplete,
      width: 500,
      height: 600,
    }).open();
  };

  return (
    <div>
      <input type="text" id="sample4_postcode" placeholder="우편번호" value={address.postcode} readOnly />
      <input type="button" onClick={openDaumPostcode} value="우편번호 찾기" /><br />
      <input type="text" id="sample4_roadAddress" placeholder="도로명주소" value={address.roadAddress} readOnly />
      <input type="text" id="sample4_jibunAddress" placeholder="지번주소" value={address.jibunAddress} readOnly />
      <span id="guide" style={{color:'#999', display: guide ? 'block' : 'none'}}>{guide}</span>
      <input 
        type="text" 
        id="sample4_detailAddress" 
        placeholder="상세주소" 
        name="detailAddress"
        value={address.detailAddress} 
        onChange={handleChange}
      />
      <input type="text" id="sample4_extraAddress" placeholder="참고항목" value={address.extraAddress} readOnly />
    </div>
  );
};

export default AddressSearch;