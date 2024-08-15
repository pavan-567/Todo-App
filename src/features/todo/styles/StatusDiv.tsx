import styled from "styled-components";

interface StatusProps {
  $complete?: boolean;
}

const StatusDiv = styled.div<StatusProps>`
  font-weight: ${(props) => (props.$complete ? "bold" : "")};
  font-style: ${(props) => (!props.$complete ? "italic" : "")};
  color: ${(props) => (props.$complete ? "green" : "red")};
`;

export default StatusDiv;
