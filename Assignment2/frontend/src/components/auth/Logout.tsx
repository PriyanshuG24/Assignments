'use client'
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import {useAuth} from "../../hooks/useAuth"


const Logout = () => {
    const {signout} = useAuth();
    const handleLogout =async () => {
        await signout();
    }
  return (
        <Button
        variant="outline"
        className="rounded-xl justify-start gap-2 text-md hover:bg-red-50 hover:text-red-600 hover:border-red-200 w-full"
        onClick={handleLogout}
        >
        <LogOut className="h-4 w-4 text-red-600" />
        Sign out
        </Button>
    )
}

export default Logout