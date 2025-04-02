import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Header } from "./widgets/Header/Header";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Footer } from "./widgets/Footer/Footer";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
