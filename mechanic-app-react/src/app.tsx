import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "./lib/axios"
import { isAuthenticatedService } from "./services/is-authenticated.service";
import { useQuery } from "@tanstack/react-query";
import { Register } from "./pages/register";


export function App() {
  const navigate = useNavigate()
  useEffect(() => {
    setupAxiosInterceptors()
  }, [])

  const { isLoading, data } = useQuery({
    queryKey: ["verify refresh token in cookies"],
    queryFn: isAuthenticatedService,
  })


  function handleStatus(status: number) {
    switch (status) {
      case 200: navigate("/home")
        break;
      case 201: navigate("/login")
        break;
      case 404:
        navigate("/login")
        break;
      case 500:
        navigate("/login")
        break;
      default:
        break;
    }
  }

  const PrivateRoute = () => {
    const isAuthenticated = data
    if (isLoading) {
      return (<div>Loading...</div>)
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  }

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register status={handleStatus} />} />
        <Route path="/login" element={<Login status={handleStatus} />} />
        <Route path="/" element={<PrivateRoute />} >
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>

    </>
  )
}

