import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Header } from "./widgets/Header/Header";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Footer } from "./widgets/Footer/Footer";
import { Profile } from "./Pages/Profile/ProfileLayout";
import { Condition } from "./Pages/Profile/Conditions/Condition";
import { MyInvestments } from "./Pages/Profile/MyInvestments/Investments";
import { Calculator } from "./Pages/Profile/Calculator/Calculator";
import { Operations } from "./Pages/Profile/Operations/Operations";
import { Partners } from "./Pages/Profile/Partners/Partners";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
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
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h1>404 Not Found</h1>
              <a href="/">Home</a>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header modal={"loginByCreds"} />
              <Home />
              <Footer />
            </>
          }
        />
        <Route path={PATHS.PROFILE} element={<ProfileNavigator />} />
      </Routes>
    </BrowserRouter>
  );
}

const ProfileNavigator = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  const tokenType = localStorage.getItem("profileType");
  if (tokenType == "investor")
    return <Navigate to={PATHS.INVESTMENT_CONDITIONS} />;

  return <Navigate to={PATHS.INVESTMENT_CONDITIONS} />;
};

export const PATHS = {
  HOME: "/",
  PROFILE: "/profile",
  INVESTMENT_CONDITIONS: "/profile/investment-conditions",
  MY_INVESTMENTS: "/profile/my-investments",
  CALCULATOR: "/profile/calculator",
  OPERATIONS: "/profile/operations",
  PARTNERS: "/profile/partners",
};

const RoutePath = [
  { name: "home", path: PATHS.HOME, isHeader: true, element: <Home /> },
];

const profilePath = [
  {
    name: "profile",
    path: PATHS.INVESTMENT_CONDITIONS,
    isHeader: false,
    element: <Condition />,
  },
  {
    name: "my-investments",
    path: PATHS.MY_INVESTMENTS,
    isHeader: false,
    element: <MyInvestments />,
  },
  {
    name: "calculator",
    path: PATHS.CALCULATOR,
    isHeader: false,
    element: <Calculator />,
  },
  {
    name: "operations",
    path: PATHS.OPERATIONS,
    isHeader: false,
    element: <Operations />,
  },
  {
    name: "partners",
    path: PATHS.PARTNERS,
    isHeader: false,
    element: <Partners />,
  },
];

export default App;
