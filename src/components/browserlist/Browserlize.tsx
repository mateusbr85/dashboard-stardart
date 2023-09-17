import { useState, useEffect } from "react"
import { ButtonToolbar, Col, Container, Content, Divider, IconButton, Panel, Row } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';


const Browserlize = () => {
    return (
        <Panel
            className='browselize-list'
        >
            <Content className="browser-content">
                <Col>
                    <label>Listagem de Usuarios</label>
                </Col>
                <Col>
                    <ButtonToolbar>
                        <IconButton  appearance="primary" color="green" icon={<PlusIcon />} placement="left">Novo</IconButton>
                    </ButtonToolbar>
                </Col>
            </Content>
            <Divider />
            <Row>
                asdasd
            </Row>
        </Panel>

    )
}

export default Browserlize