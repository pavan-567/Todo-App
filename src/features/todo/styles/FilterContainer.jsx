import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  & select {
    border: none;
    outline: none;
    border-radius: 3px;
    padding: 3px 2px;
  }
`;

export default FilterContainer;