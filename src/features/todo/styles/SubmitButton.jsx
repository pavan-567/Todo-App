import styled from "styled-components";

const SubmitButton = styled.button`
  align-self: flex-end;
  margin-bottom: 7px;
  color: #090909;
  padding: 5px 10px;
  font-size: 10px;
  border-radius: 0.5em;
  background: #e8e8e8;
  cursor: pointer;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  &:hover {
    border: 1px solid gray;
  }

  &:active {
    box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
  }
`;

export default SubmitButton;
