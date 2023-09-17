import { useLocation } from "react-router-dom";
import { Container, Content, Footer, Sidebar, Sidenav, Button, Nav, Header } from "rsuite";
import SidebarModules from "../components/sidebar/sidebarModules/SidebarModules";
import HeaderPage from "../components/header/HeaderPage";
import Browserlize from "../components/browserlist/Browserlize";

const DashboardBrowselizePage = () => {
  return (<>
    <div className="main-body">
      <SidebarModules type="dashboard" />
      <Container>
        <Header>
          <HeaderPage type="dashboard" />
        </Header>
        <Container>
          <Content>
            <Browserlize />
          </Content>
        </Container>
      </Container>
    </div>
  </>);
}

export default DashboardBrowselizePage