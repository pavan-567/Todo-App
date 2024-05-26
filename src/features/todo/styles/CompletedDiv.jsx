import styled from "styled-components";

const CompletedDiv = styled.div`
  padding: 12px 15px;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 3px;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

  & :first-child {
    font-size: 10px;
    font-weight: bolder;
  }

  :last-child {
    font-weight: bold;
    font-size: 20px;
    color: green;
  }

  :last-child span {
    color: black;
  }
`;


export default CompletedDiv;