import styled from "styled-components";

const Item = styled.div`
  border: 1px solid black;
  padding: 5px 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 2px;
  margin-right: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border: none;

  gap: 10px;

  /* background-color: rgba(0, 25, 33, 0.1); */

  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  & .icon {
    transition: transform 0.2s linear;
    cursor: pointer;
  }

  & .icon:hover {
    transform: scale(1.3);
  }

  & #title {
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 2px;
    /* font-family: "Courier New", Courier, monospace; */
    word-break: break-word;
  }

  & #description {
    word-break: break-word;
  }

  & #time {
    font-size: 10px;
    margin-top: 5px;
  }

  & #status {
    font-size: 10px;
    display: flex;
    gap: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    padding: 5px 3px;
    display: inline-block;
  }

  & #status div:last-child {
    /* color: ${(props) => (props.status === "completed" ? "green" : "red")}; */
    font-weight: bold;
    /* font-style: ${(props) =>
      props.status === "completed" ? "bold" : "italic"}; */
  }

  & button {
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 10px;

    display: flex;
    align-items: center;
    gap: 3px;

    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s;
  }

  & button:hover {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
`;

export default Item;
