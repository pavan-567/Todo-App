import styled from "styled-components";

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px 2px;

  & label {
    font-size: 12px;
    font-weight: bold;
  }

  & textarea {
    border: none;
    padding: 4px;
    margin: 2px 0;
    border-radius: 3px;
    outline: none;
    resize: none;
    height: 50px;
  }

  & input,
  & textarea {
    caret-color: black;
  }
`;

export default InputDiv;
