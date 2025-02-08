import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "./lib/axios"
import { isAuthenticatedService } from "./services/is-authenticated.service";
import { useQuery } from "@tanstack/react-query";
import { Register } from "./pages/register";
import { Appointments } from "./pages/appoinments";
import { Cars } from "./pages/cars";
import { Layout } from "./layout";
import { UpdateVehicle } from "./components/vehicle/update-vehicle";

export function App() {
  useEffect(() => {
    setupAxiosInterceptors()
  }, [])

  const { isLoading, data } = useQuery({
    queryKey: ["verify refresh token in cookies"],
    queryFn: isAuthenticatedService,
    staleTime: 1000 * 60 * 60 * 24
  })
  console.log("data", data)


  function handleStatus(status: number) {
    switch (status) {
      case 200: window.location.href = "/home"
        break;
      case 201: window.location.href = "/login"
        break;
      case 404:
        window.location.href = "/login"
        break;
      case 500:
        window.location.href = "/login"
        break;
      default:
        break;
    }
  }

  const PrivateRoute = () => {
    const path = window.location.pathname
    if (path === "/") {
      window.location.href = "/login"
    }
    const isAuthenticated = data
    if (isLoading) {
      return (<div>Loading...</div>)
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login status={handleStatus} />} />
        <Route path="/register" element={<Register status={handleStatus} />} />

        <Route path="/" element={<PrivateRoute />} >
          <Route element={<Layout />} >
            <Route path="/home" element={<Home />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/car/:id/update" element={<UpdateVehicle />} />
          </Route>
        </Route>

      </Routes >
    </>
  )
}

