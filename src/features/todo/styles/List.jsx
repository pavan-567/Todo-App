import styled from "styled-components";

const List = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  max-height: 500px;
  overflow-y: auto;

  scrollbar-gutter: stable; // Reserves Space For Scroll Bar When Even It Isn't Visible

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e0e0e0;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #85ffbd;
    background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    border-radius: 100px;
  }
`;

export default List;
