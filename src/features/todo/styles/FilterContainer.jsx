import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  & select {
    border: none;
    outline: none;
    border-radius: 3px;
    padding: 3px 2px;
  }

  @media screen and (max-width: 540px) {
    justify-content: center;
    & select {
      flex: 1 0 100%;
    }
  }
`;

export default FilterContainer;
