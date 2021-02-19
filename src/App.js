import HeaderMenu from "./components/HeaderMenu";
import Board from "./components/Board";
import bgImg from "./assets/javascript-golden-logo-programming-language-brown-metal-background-creative-javascript-logo-besthqwallpapers.com-2133x1200.jpg";
import styled from "styled-components";

export default function App() {
  return (
    <AppContainer>
      <HeaderMenu />
      <Board />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  height: 100vh;
  background-image: url(${bgImg});
`;
