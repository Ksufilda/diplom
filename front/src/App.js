import "./App.css";
import Header from "./components/Header/Header";
import MainCanvas from "./components/MainCanvas/MainCanvas";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <div className="main-container">
      <Header />
      <div className="container">
        <Profile></Profile>
        <MainCanvas></MainCanvas>
      </div>
    </div>
  );
}

export default App;
