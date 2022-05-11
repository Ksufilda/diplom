import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Header from "./components/Header/Header";
import MainCanvas from "./components/MainCanvas/MainCanvas";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main-container">
        <Header />
        <div className="container">
          <Profile></Profile>
          <MainCanvas></MainCanvas>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
