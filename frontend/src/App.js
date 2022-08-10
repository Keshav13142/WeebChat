import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Chats from "./pages/Chats";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chats" element={<Chats />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
