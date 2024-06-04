import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  & * {
    flex-grow: 1;
  }
`;

export default InputContainer;