import { Outlet } from "react-router-dom";
import { Container, Content, Footer, Sidebar, Sidenav, Button, Nav, Header } from "rsuite";
import SideBarRsuite from "../components/sidebar/SideBarRsuite";
import SidebarModules from "../components/sidebar/sidebarModules/SidebarModules";
import HeaderPage from "../components/header/HeaderPage";
// import Header from '../components/header/Header'

export const DashboardModulePage = () => {
  return (<>
    <div className="main-body">
      <SidebarModules type="modules"/>
      <Container>
        <Header>
          <HeaderPage type="modules"/>
        </Header>
        <Container>
          <Content></Content>
        </Container>
      </Container>
    </div>
  </>);
};
