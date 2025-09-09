'use client'
import Sidebar from "./Sidebar"
import { useAuth } from "@/hooks/useAuth"


const AuthSidebar = () => {
  const { isAuthenticated } = useAuth()
    return (
        <>
            {isAuthenticated && <Sidebar />}
        </>
    )
}

export default AuthSidebar