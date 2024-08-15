import styled from "styled-components";

interface ButtonProps {
  disabled?: boolean
}

const Button = styled.button<ButtonProps>`
  border-radius: 5px;
  outline: none;
  border: 1px solid #e8e8e8;
  padding: 5px 12px;
  background-color: white;
  cursor: pointer;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  transition: all 0.2s;

  &:hover {
    border: 1px solid gray;
  }

  &:disabled {
    cursor: default;
    border: none;
    transform: none;
    background-color: #c5c5c5;
  }

`;

export default Button;