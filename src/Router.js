import { lazy } from "react";
import { Navigate } from "react-router-dom";
import CreatePetPage from "./layouts/CreatePetPage";
import EditShelterPage from "./layouts/EditShelterPage";
import PersonalDataPage from "./layouts/PersonalDataPage";
import ShelterPage from "./layouts/ShelterPage";
import ReservationsPage from "./layouts/ReservationsPage";

/****Layouts*****/
const FullLayout = lazy(() => import("./layouts/FullLayout"));
const MainPage = lazy(() => import("./layouts/MainPage.js"));
const PetsPage = lazy(() => import("./layouts/PetsPage.js"));
const PetPage = lazy(() => import("./layouts/PetPage.js"));
const LoginPage = lazy(() => import("./layouts/LoginPage.js"));
const RegisterPage = lazy(() => import("./layouts/RegisterPage.js"));
const VolunteeringPage = lazy(() => import("./layouts/VolunteeringPage.js"));

/*****Routes******/
const Routes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/main" /> },
      { path: "/main", exact: true, element: <MainPage /> },
      {
        path: "/suteik-namus",
        exact: true,
        element: <PetsPage userSpecific={false} />,
      },
      {
        path: "/pamegti-gyvunai",
        exact: true,
        element: <PetsPage userSpecific={true} />,
      },
      {
        path: "/prieglaudos-gyvunai",
        exact: true,
        element: <PetsPage userSpecific={true} />,
      },
      { path: "/suteik-namus/:id", exact: true, element: <PetPage /> },
      { path: "/savanoriauk", exact: true, element: <VolunteeringPage /> },
      { path: "/savanoriauk/:id", exact: true, element: <ShelterPage /> },
      { path: "/anketos-kurimas", exact: true, element: <CreatePetPage /> },
      { path: "/rezervacijos", exact: true, element: <ReservationsPage /> },
      {
        path: "/anketos-redagavimas/:id",
        exact: true,
        element: <CreatePetPage />,
      },
      {
        path: "/prieglaudos-redagavimas",
        exact: true,
        element: <EditShelterPage />,
      },
      { path: "/prisijungimas", exact: true, element: <LoginPage /> },
      { path: "/registracija", exact: true, element: <RegisterPage /> },
      {
        path: "/vartotojo-duomenys",
        exact: true,
        element: <PersonalDataPage />,
      },
    ],
  },
];

export default Routes;
