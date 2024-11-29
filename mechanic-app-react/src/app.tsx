import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "./lib/axios"
import { isAuthenticatedService } from "./services/is-authenticated.service";
import { useQuery } from "@tanstack/react-query";


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
    status === 200 &&
      navigate("/home")
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
        <Route path="/login" element={<Login status={handleStatus} />} />
        <Route path="/" element={<PrivateRoute />} >
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>

    </>
  )
}

