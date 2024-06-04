import styled from "styled-components";

const SubmitButton = styled.button`
  /* align-self: flex-end; */
  align-self: flex-start;
  margin-bottom: 7px;
  color: #090909;
  padding: 5px 30px;
  font-size: 10px;
  border-radius: 0.5em;
  background: #e8e8e8;
  cursor: pointer;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
  display: flex;
  align-items: center;
  gap: 7px;

  letter-spacing: 5px;

  & span {
    font-size: 15px;
  }

  &:hover {
    border: 1px solid gray;
  }

  &:active {
    box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
  }

  &:disabled {
    cursor: default;
    background: #c5c5c5;
    border: none;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    color: gray;
  }
`;

export default SubmitButton;
