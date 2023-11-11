import { Container, Content, Header } from "rsuite";
import SidebarModules from "../components/sidebar/sidebarModules/SidebarModules";
import HeaderPage from "../components/header/HeaderPage";
import Browserlize from "../components/browserlist/Browserlize";
import {BrowserlizePage} from '../components/dashboard/BrowserlizePage'
import config from "../components/configModules";
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";


const DashboardBrowselizePage = () => {
  const isLocation: string = location.pathname.split("/").slice(-1).toString();
  const navigate: NavigateFunction = useNavigate();
  const isMosuleTranslate = () => {
    for (let i in config.modules) {
      const labelModules = config.modules[i].label;
      const urlModules = config.modules[i].url;
      if (urlModules == isLocation) {
        return {
          urlModules,
          labelModules
        }
      }
    }
  };

  useEffect(() => { 
    isMosuleTranslate();

  }, [isLocation]); 

  const navidageToPages = (router: string): void => {
    navigate(router)
  }

  return (<>
    <div className="main-body">
      <SidebarModules 
        type="dashboard"
        routerNavigate={navidageToPages}
      />
      <Container>
        <Header>
          <HeaderPage type="dashboard" />
        </Header>
        <Container>
          <Content>
            {location.pathname.split("/").slice(+1).length == 3 && (
              <Browserlize 
                setNameModule={isMosuleTranslate}
              />
            )}
            {location.pathname.split("/").slice(+1).length == 2 && (
              <BrowserlizePage 
                setNameModule={isMosuleTranslate}
              />
            )}
          </Content>
        </Container>
      </Container>
    </div>
  </>);
}

export default DashboardBrowselizePage