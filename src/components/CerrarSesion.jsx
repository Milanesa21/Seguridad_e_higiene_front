import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"

export const CerrarSesion = () => {
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const cerrarSesion = () => {
        console.log('Cerrando sesión')
        logout()
        navigate('/')
        localStorage.removeItem('token')
    }
  return (
    <a style={{cursor: 'pointer'}} onClick={cerrarSesion}>
      Cerrar Sesión
    </a>
  )
}
