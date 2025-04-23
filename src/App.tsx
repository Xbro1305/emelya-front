import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Header } from "./widgets/Header/Header";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Footer } from "./widgets/Footer/Footer";
import { Profile } from "./Pages/Profile/Profile";
import { Condition } from "./Pages/Profile/Conditions/Condition";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {RoutePath.map((route) => {
          return (
            <Route
              key={route.name}
              path={route.path}
              element={
                <>
                  {route.isHeader && <Header />}
                  {route.element}
                  {route.isHeader && <Footer />}
                </>
              }
            />
          );
        })}
        <Route element={<Profile />}>
          {profilePath.map((route) => {
            return (
              <Route
                key={route.name}
                path={route.path}
                element={
                  <>
                    {route.isHeader && <Header />}
                    {route.element}
                    {route.isHeader && <Footer />}
                  </>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const RoutePath = [
  { name: "home", path: "/", isHeader: true, element: <Home /> },
];

const profilePath = [
  {
    name: "profile",
    path: "/profile/investment-conditions",
    isHeader: false,
    element: <Condition />,
  },
];

export default App;
