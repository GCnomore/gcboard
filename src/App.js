import HeaderMenu from './components/HeaderMenu';
import Board from './components/Board';
import bgImg from './assets/javascript-golden-logo-programming-language-brown-metal-background-creative-javascript-logo-besthqwallpapers.com-2133x1200.jpg';

import './styles/App.css';

function App() {
  return (
    <div className="appContainer" style={{ backgroundImage: `url(${bgImg})` }}>
      <HeaderMenu />
      <Board />
    </div>
  );
}

export default App;
