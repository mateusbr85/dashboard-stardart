import { Input, InputGroup, Avatar, Dropdown, Breadcrumb } from "rsuite";
import { BreadCrumbCustom } from "../formFields/BreadCrumbCustom";
import { AxiosSearchPicker } from "../formFields/AxiosSearchPicker";

interface DashboardModulesProps {
  type: "dashboard" | "modules";
}

const HeaderPage = ({ ...props }: DashboardModulesProps) => {
  return (
    <>
      <div className="header">
        <div className="search">
          <AxiosSearchPicker placeholder="Pesquisar..." />
        </div>
        <div className="mensage-header">
          {props.type == "modules" && (
            <>
              <span>Seja Bem vindo ao Sistema</span>
            </>
          )}
          {props.type == "dashboard" && (
            <>
            <BreadCrumbCustom/>
            </>
          )}
        </div>
        <div className="avatar-header">
          <div className="text">
            <span className="name">Mateus Veloso</span>
            <span className="function">Administrador</span>
          </div>
          <div className="avatar-image">
            <Avatar circle src="/perfil-avatar.JPEG" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPage;
