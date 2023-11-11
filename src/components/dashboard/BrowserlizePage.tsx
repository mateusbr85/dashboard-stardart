import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { Panel, Content, Col, ButtonToolbar, IconButton, Divider, Row, Table } from "rsuite";

interface Props {
    setNameModule: Function
}

const BrowserlizePage = ({ ...props }: Props) => {
    
    return (<>
        <Panel
            className='browselize-list'
        >
            <Content className="browser-content-page">
                <Col>
                    <label>Bem vindo ao Dashboard de {props.setNameModule().labelModules}</label>
                </Col>
            </Content>
            <Divider />
            <Row>
                <Table>

                </Table>
            </Row>
        </Panel>
    </>)
}

export { BrowserlizePage }