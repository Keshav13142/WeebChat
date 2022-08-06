import { Route, Routes } from "react-router-dom";
import Chats from "./pages/Chats";
import Home from "./pages/Home";
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
