import { Input, InputGroup, Avatar, Dropdown, Breadcrumb, Button, ButtonGroup, IconButton, Whisper, Popover, ButtonToolbar } from "rsuite";
import { BreadCrumbCustom } from "../formFields/BreadCrumbCustom";
import { AxiosSearchPicker } from "../formFields/AxiosSearchPicker";

interface DashboardModulesProps {
  type: "dashboard" | "modules";
}

const HeaderPage = ({ ...props }: DashboardModulesProps) => {

  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = (eventKey: any) => {
      onClose();
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item eventKey={6}>Configurações</Dropdown.Item>
          <Dropdown.Item eventKey={7}>Sair <i className="fas fa-sign-in-alt"></i></Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };
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
              <BreadCrumbCustom />
            </>
          )}
        </div>
        {/* <ButtonToolbar className="avatar-header">
          <div className="text-header">
            <span className="name">Mateus Veloso</span>
            <span className="function">Administrador</span>
          </div>
          <div className="avatar-image">
            <Whisper placement="bottomEnd" trigger="click" speaker={renderMenu}  >
              <Avatar circle src="/perfil-avatar.JPEG" />
            </Whisper>
          </div>
        </ButtonToolbar> */}
        <div className="avatar-header">
          <div className="text">
            <span className="name">Mateus Veloso</span>
            <span className="function">Administrador</span>
          </div>
          <div className="avatar-image">
            <Whisper placement="bottomEnd" trigger="click" speaker={renderMenu}  >
              <Avatar circle src="/perfil-avatar.JPEG" />
            </Whisper>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPage;
