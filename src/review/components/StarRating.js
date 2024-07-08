import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { ImStarFull } from 'react-icons/im';

const RatingBox = styled.div`
  margin: 0 auto;
  text-align: center;

  & svg {
    color: #c4c4c4;
    cursor: pointer;
  }
  :hover svg {
    color: #ffd700;
  }
  & svg:hover ~ svg {
    color: #c4c4c4;
  }
  .black {
    color: #ffd700;
  }
`;

export default function StarRating({ onChange, initialRating = 0 }) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

    // initialRating이 변경될 때 별점 상태를 업데이트
  useEffect(() => {
    setClicked(clicked.map((_, index) => index < initialRating));
  }, [initialRating]);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    onChange && onChange(clickStates.filter(Boolean).length);
  };

  return (
    <RatingBox>
      {[...Array(5)].map((_, index) => (
        <ImStarFull
          key={index}
          onClick={() => handleStarClick(index)}
          className={clicked[index] && "black"}
          size="35"
        />
      ))}
    </RatingBox>
  );
}