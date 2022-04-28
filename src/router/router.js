import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "../components/Header";
import { Home } from "../pages/Home";
import { CoinPage } from "../pages/CoinPage";

import { Alert } from "../components/Alert";

export const AppRouter = () => {
  return(
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/coins/:id" element={<CoinPage/>} />
      </Routes>
      <Alert/>
    </Router>
  )
}