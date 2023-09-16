import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Loader, Placeholder } from 'rsuite';
import { AuthContext } from "../context/AuthContext";
import { Axios } from "../utils/axios";

interface PrivateRouterProps {
  redirectTo: string;
}

const PrivateRouter = ({ redirectTo }: PrivateRouterProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const token = localStorage.getItem("token");
  const context = useContext(AuthContext);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (token) {
        try {
          const res = await Axios.get(`/api/auth/authenticated/me/${token}`);
          setIsAuthenticated(res.data.response.isAuth);
        } catch (error) {
          setIsAuthenticated(false);
          alert("Usuário inválido!");
        }
      } else {
        setIsAuthenticated(false);
      }

      // Ocultar o spinner após 3 segundos
      setTimeout(() => {
        setShowSpinner(false);
      }, 600);
    };

    checkAuthentication();
  }, [token]);

  if (showSpinner) {
    // Renderizar o spinner enquanto aguarda a verificação de autenticação
    return (
      <div>
        <Loader size="lg" color="primary" center content="loading" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export { PrivateRouter };
