import { Route, Routes } from "react-router-dom";
import Chats from "./components/Chats/Chats";
import Home from "./components/Home/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chats" element={<Chats />}></Route>
      </Routes>
    </>
  );
}

export default App;
