import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "./lib/axios"
import { isAuthenticatedService } from "./services/user/is-authenticated.service";
import { useQuery } from "@tanstack/react-query";
import { Register } from "./pages/register";
import { Appointments } from "./pages/appoinments";
import { Cars } from "./pages/cars";
import { Layout } from "./layout";
import { UpdateVehicle } from "./components/vehicle/update-vehicle";
import { AvailableTimes } from "./components/mechanic/available-times";
import { CreateSchedulePage } from "./components/schedule/create-schedule-page";
import { RegisterMechanic } from "./pages/mechanic/register";
import { MechanicApp } from "./pages/mechanic-app";
import { Questions } from "./pages/mechanic/questions";
import { Dashboard } from "./pages/mechanic/dashboard";
import { DashboardOrderService } from "./pages/mechanic/dashboard-order-service";

export function App() {
  useEffect(() => {
    setupAxiosInterceptors()
  }, [])

  const { isLoading, data } = useQuery({
    queryKey: ["verify refresh token in cookies"],
    queryFn: isAuthenticatedService,
    staleTime: 1000 * 60 * 60 * 24
  })

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
    const isAuthenticated = data?.isAuthenticated

    if (isLoading) {
      return (<div>Loading...</div>)
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  }

  const MechanicRoute = () => {
    const role = data?.role
    if (role === "EMPLOYEE" || role === "BOSS") {
      return <Outlet />
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={< MechanicApp />} />
        <Route path="/login" element={<Login status={handleStatus} />} />
        <Route path="/register" element={<Register status={handleStatus} />} />
        <Route path="/questions" element={< Questions />} />

        <Route element={<PrivateRoute />} >
          <Route element={<Layout />} >

            <Route element={<MechanicRoute />}>
              <Route path="/register-mechanic" element={< RegisterMechanic />} />
              <Route path="/dashboard" element={< Dashboard />} />
              <Route path="/dashboard/:orderServiceId" element={<DashboardOrderService />} />
            </Route>

            <Route path="/home" element={<Home />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/car/:id/update" element={<UpdateVehicle />} />
            <Route path="/mechanic/:id" element={<AvailableTimes />} />
            <Route path="/create-schedule/:id" element={< CreateSchedulePage />} />
          </Route>
        </Route>

      </Routes >
    </>
  )
}

