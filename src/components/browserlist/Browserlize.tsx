import { useState, useEffect } from "react"
import { ButtonToolbar, Col, Container, Content, Divider, IconButton, Panel, Row, Table } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';


interface Props {
    setNameModule: Function
}

const Browserlize = ({...props}: Props) => {
    const isLocation: string = location.pathname.split("/").slice(-1).toString();
    const [pageTranslateName, setPageTranslateName] = useState<string>('')
    // console.log('teste >>> ',location.pathname.split("/").slice(-1))

    const isPageTranslate = (location: string, data: Array<Record<string,any>>, counter = 0) => {
        let result: string = ''
        for(const item of data) {
            if (counter === 0) {
                if (item.menu_slug === location) {
                  result = item.menu_text_name;
                  break; 
                } else if (item.sub_menus.length > 0) {
                  result = isPageTranslate(location, item.sub_menus, counter + 1);
                  if (result !== '') break; 
                }
              }
            if(counter > 0 && item.sub_menu_slug === location) {
                result = item.sub_menu_text_name
                break;
            }
        }
        return result
    }

    useEffect(() => {
        const menu: any = localStorage.getItem('menu');
        setPageTranslateName(isPageTranslate(isLocation,JSON.parse(menu)['menus']))
    },[isLocation])

    return (
        <Panel
            className='browselize-list'
        >
            <Content className="browser-content">
                <Col>
                    <label>Listagem de {pageTranslateName}</label>
                </Col>
                <Col>
                    <ButtonToolbar>
                        <IconButton  appearance="primary" color="green" icon={<PlusIcon />} placement="left">Novo</IconButton>
                    </ButtonToolbar>
                </Col>
            </Content>
            <Divider />
            <Row>
                <Table>
                    
                </Table>
            </Row>
        </Panel>

    )
}

export default Browserlize