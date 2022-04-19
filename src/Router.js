import { lazy } from "react";
import { Navigate } from "react-router-dom";
import CreatePetPage from "./layouts/CreatePetPage";
import ShelterPage from "./layouts/ShelterPage";

/****Layouts*****/
const FullLayout = lazy(() => import("./layouts/FullLayout"));
const MainPage = lazy(() => import("./layouts/MainPage.js"));
const PetsPage = lazy(() => import("./layouts/PetsPage.js"));
const PetPage = lazy(() => import("./layouts/PetPage.js"));
const LoginPage = lazy(() => import("./layouts/LoginPage.js"));
const RegisterPage = lazy(() => import("./layouts/RegisterPage.js"));
const VolunteeringPage = lazy(() => import("./layouts/VolunteeringPage.js"));
// const About = lazy(() => import("../views/About.js"));
// const Alerts = lazy(() => import("../views/ui/Alerts"));
// const Badges = lazy(() => import("../views/ui/Badges"));
// const Buttons = lazy(() => import("../views/ui/Buttons"));
// const Cards = lazy(() => import("../views/ui/Cards"));
// const Grid = lazy(() => import("../views/ui/Grid"));
// const Tables = lazy(() => import("../views/ui/Tables"));
// const Forms = lazy(() => import("../views/ui/Forms"));
// const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const Routes = [
  {
    path: "/",
    element: <FullLayout />,
    // todo: registracija ir prisijungimas neturetu but po fulllayout gaaal ?? kad nebutu header?
    children: [
      { path: "/", element: <Navigate to="/main" /> },
      { path: "/main", exact: true, element: <MainPage /> },
      { path: "/suteik-namus", exact: true, element: <PetsPage /> },
      { path: "/suteik-namus/:id", exact: true, element: <PetPage /> },
      { path: "/savanoriauk", exact: true, element: <VolunteeringPage /> },
      { path: "/savanoriauk/:id", exact: true, element: <ShelterPage /> },
      { path: "/anketos-kurimas", exact: true, element: <CreatePetPage /> },
      { path: "/prisijungimas", exact: true, element: <LoginPage /> },
      { path: "/registracija", exact: true, element: <RegisterPage /> },
    ],
  },
];

export default Routes;
