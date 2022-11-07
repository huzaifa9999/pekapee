
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home2 } from "./pages/Home2";
import { Home } from "./pages/Home";
function App() {
  return (
   <>
<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/pagination" element={<Home2/>}></Route>
</Routes>
   </>
  );
}

export default App;
