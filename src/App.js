import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinPage from "./components/JoinPage";
import LoginPage from "./components/LoginPage";
import MainPage from './components/MainPage';


function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/join' element={<JoinPage />} />
          <Route path='/main' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
