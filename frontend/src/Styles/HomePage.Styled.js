import styled from "styled-components";

export const HomePageWrapper = styled.div`
  margin: 0;
  padding: 0;
  height: 90vh;
  display: flex;
`;

export const ImageWrapper = styled.div`
  margin: 2vh 15vh 2vh 2vh;
  padding: 0;
  height: 80vh;
  display: flex;
  border-radius: 25%;
`;

export const Image = styled.img`
  width: 100%;
  height: 89vh;
  object-fit: cover;
  border-radius: 10%;
`;

export const TextWrapper = styled.div`
  width: 60%;
  margin: 2vh 2vh 2vh 15vh;
  background-color: #007BFF;
  border-radius: 10%;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const Text = styled.div`
  color: #ffffff;
  font-size: 16px;
  text-align: left;
`;

export const A = styled.a`
  margin: 1vw 1vw 0vw 1vw;
  width: 50%;
  padding: 10px;
`;
