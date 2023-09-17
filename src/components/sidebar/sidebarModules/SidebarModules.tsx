import { useState, useEffect, useContext } from "react";
import FooterSidebar from "../FooterSidebar";
import { useNavigate, NavigateFunction } from "react-router-dom";
import {
  Tooltip,
  Whisper,
  Button,
  Nav,
  Header,
  InputGroup,
  Input,
  Divider,
  Col,
  Row,
} from "rsuite";
import config from "../../configModules";
import { AxiosSearchPicker } from "../../formFields/AxiosSearchPicker";
import { Axios } from "../../../utils/axios";
import { AuthContext } from "../../../context/AuthContext";

interface SidebarModulesProps {
  type: "dashboard" | "modules";
}

type moduleContent = {
  module_fk_user_type_id: number;
  module_icon: string;
  module_id: number;
  module_slug: string;
  module_text_name: string;
  user_created_at: any;
}[];

type menuContent = {
  menu_id: number;
  menu_text_name: string;
  menu_type_client_fk_user_type_id: number;
  menu_created_at: any;
  menu_fk_module_id: number;
  menu_active: boolean;
  menu_order: number;
  menu_slug: string | null;
  menu_icon: string;
  sub_menus: Record<string,any>;
  sub_menu_id: number | null;
  sub_menu_text_name: string;
  sub_menu_type_client_fk_user_type_id: number | null;
  sub_menu_created_at: any;
  sub_menu_fk_menu_id: number | null;
  sub_menu_active: boolean | null;
  sub_menu_by_fk_module_id: number | null;
  sub_menu_slug: string;
}[];

const SidebarModules = ({ ...props }: SidebarModulesProps) => {
  const navigate: NavigateFunction = useNavigate();
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isClosedMenu, setIsClosedMenu]  = useState<boolean>(false);
  const [moduleDestini, setModuleDestini] = useState<string>("");
  const isLocation: string = location.pathname.split("/").slice(-1).toString();
  const [userAuth, setUserAuth] = useContext(AuthContext);
  const [modules, setModules] = useState<moduleContent>([]);
  const [menus, setMenus] = useState<menuContent>([]);
  const [subMenus, setSubMenus] = useState<[]>([]);
  const [toogle, setToogle] = useState<string>('fas fa-chevron-left fa-lg toogle')

  // useEffect
  useEffect(() => {
    isMosuleTranslate();
    const itensMenu: any = localStorage.getItem("menu");
    const { modules, menus, menuByModule } = JSON.parse(itensMenu);

    setModules(modules);
    setMenus(menus);
    setSubMenus(menuByModule);
  }, [isLocation]);

  // functions
  const resizeSidebar = () => {
    if(!isClosed) {
      setToogle('fas fa-chevron-right fa-lg toogle')
    }else {
      setToogle('fas fa-chevron-left fa-lg toogle')
    }
    setIsClosed(!isClosed);
  };

  const openSubMenu = () => {
    setIsClosedMenu(!isClosedMenu)
  }

  const isMosuleTranslate = () => {
    for (let i in config.modules) {
      const labelModules = config.modules[i].label;
      const urlModules = config.modules[i].url;
      if (urlModules == isLocation) {
        setModuleDestini(labelModules);
      }
    }
  };

  const isRenderModules = () => {
    const outputModules: any = [];
    for (const i in modules) {
      const moduleData = modules[i];
      outputModules.push(
        <div
          className="module-box"
          onClick={() => navigate(`${moduleData.module_slug}`)}
          key={moduleData.module_id}
        >
          <Whisper
            followCursor
            speaker={<Tooltip>{moduleData.module_text_name}</Tooltip>}
          >
            <i
              style={{ color: "#FFFFFF" }}
              className={moduleData.module_icon}
            ></i>
          </Whisper>
        </div>
      );
    }
    return outputModules;
  };

  const isRenderSubMenus = (data:any) => {
    const output: any = [];
    for(let i in data){
      output.push(
        <li key={i} onClick={() => navigate(`${data[i].sub_menu_slug}`)}>
          <a>
            {data[i].sub_menu_text_name}
          </a>
        </li>
      )
    }

    return output;
  };

  const isRenderMenuItens = () => {
    const output: any = [];
    for (let i in menus) {
      const itensMenu = menus[i];
      if(itensMenu.sub_menus.length >= 1){
        output.push(
          <>
          <div onClick={() => openSubMenu()} className="icon-link">
            <li key={i} className="nav-link">
              <a>
                <i className={itensMenu.menu_icon}></i>
                <div className="menu-icon-text">
                  <span className="text">{itensMenu.menu_text_name}</span>
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
            </li>
          </div>
          <ul className="sub-menu">
          {isRenderSubMenus(itensMenu.sub_menus)}
          </ul>
          </>
        )
      }else {
        output.push(
          <>
            <li key={itensMenu.menu_id} className="nav-link" onClick={() => navigate(`${itensMenu.menu_slug}`)}>
              <a>
                <i className={itensMenu.menu_icon}></i>
                <span className="text">{itensMenu.menu_text_name}</span>
              </a>
            </li>
          </>
        );
      }
    }
    return output;
  };

  return (
    <>
      <Nav className={isClosed ? "sidebar-module close" : "sidebar-module"}>
        <Header>
          <div className="image-text">
            <span className="image">
              <img src="/logo.png" />
            </span>

            <div className="text header-text">
              <span className="module-text">Menus</span>
            </div>
          </div>
          <Divider></Divider>
          {props.type == "dashboard" && (
            <div onClick={(e) => resizeSidebar()}>
              <i className={toogle}></i>
            </div>
          )}
        </Header>
        <div className="menu-bar">
          <Row className={!isClosedMenu ? "menu" : "menu click"}>
            {props.type == "dashboard" && (
              <>
                <li className="nav-link">
                  <AxiosSearchPicker placeholder={"Pesquisar"} />
                </li>
                <ul className={isClosedMenu ? "menu-links" : "menu-links close"}>
                  {isRenderMenuItens()}
                </ul>
              </>
            )}
            {props.type == "modules" && (
              <div className="menu-modules">{isRenderModules()}</div>
            )}
          </Row>
          {props.type == "dashboard" && (
            <Row className="bottom-content">
              <li className="mode">
                <div
                  className="Modules-tolkit"
                  onClick={() => navigate(`/dashboard`)}
                >
                  <Whisper followCursor speaker={<Tooltip>Dashboard</Tooltip>}>
                    <i
                      style={{ fontSize: "30px", marginTop: "5px" }}
                      className="fab fa-buromobelexperte fa-lg"
                    ></i>
                  </Whisper>
                </div>
                <span className="mode-text">{moduleDestini}</span>
              </li>
            </Row>
          )}
        </div>
      </Nav>
    </>
  );
};

export default SidebarModules;
