import { Route, Routes } from "react-router-dom";
import Chats from "./components/Chats";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chats" element={<Chats />}></Route>
      </Routes>
    </div>
  );
}

export default App;
