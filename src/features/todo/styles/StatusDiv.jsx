import styled from "styled-components";

const StatusDiv = styled.div`
  font-weight: ${(props) => (props.complete === "true" ? "bold" : "")};
  font-style: ${(props) => (props.complete === "false" ? "italic" : "")};
  color: ${(props) => (props.complete === "true" ? "green" : "red")};
`;

export default StatusDiv;
