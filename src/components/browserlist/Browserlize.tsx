import { useState, useEffect } from "react"
import { ButtonToolbar, Col, Container, Content, Divider, IconButton, Panel, Row, Modal, Button } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';
import { Axios } from "../../utils/axios";
import { toast, ToastContainer } from 'react-toastify';
import { TableList } from '../formFields/TableList'



interface Props {
    setNameModule: Function
}

const Browserlize = ({ ...props }: Props) => {
    const isLocation: string = location.pathname.split("/").slice(-1).toString();
    const [pageTranslateName, setPageTranslateName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [dataTable, setDataTable] = useState<{
        pagination: {
            currentPage: number;
            perPage: number;
            totalPages: number;
            totalItems: number;
        },
        registros: [{}]
    }>({
        pagination: {
            currentPage: 0,
            perPage: 0,
            totalPages: 0,
            totalItems: 0,
        },
        registros: [{}]
    })
    const [open, setOpen] = useState(false);
    const [modalBody, setModalBody] = useState<{
        id_error: string | number,
        body_text: string
    }>({
        id_error: '',
        body_text: ''
    })


    const handleClose = () => setOpen(false);

    useEffect(() => {
        const menu: any = localStorage.getItem('menu');
        setPageTranslateName(isPageTranslate(isLocation, JSON.parse(menu)['menus']))
        loadItensPage(isLocation)
    }, [isLocation])

    const isPageTranslate = (location: string, data: Array<Record<string, any>>, counter = 0) => {
        let result: string = ''
        for (const item of data) {
            if (counter === 0) {
                if (item.menu_slug === location) {
                    result = item.menu_text_name;
                    break;
                } else if (item.sub_menus.length > 0) {
                    result = isPageTranslate(location, item.sub_menus, counter + 1);
                    if (result !== '') break;
                }
            }
            if (counter > 0 && item.sub_menu_slug === location) {
                result = item.sub_menu_text_name
                break;
            }
        }
        return result
    }


    const loadItensPage = (crud: string) => {
        setIsLoading(true)
        Axios.get(`/api/v1/${crud}/list`)
            .then((response) => {
                setDataTable(response.data)
            })
            .catch((e) => {
                setModalBody(e.response.data.location)
                setModalBody({
                    id_error: e.response.data.id_error,
                    body_text: e.response.data.location
                })
                setOpen(true)
                // toast.info(e.response.data.location, {
                //     position: 'top-center',
                //     // autoClose: 2000,
                //     hideProgressBar: false,
                //     theme: 'light'
                // })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (<>
        <Modal
            open={open}
            backdrop="static" 
            role="alertdialog"
            size="md"
        >
            <Modal.Header>
                <Modal.Title>Se você recebeu esse erro contate o desenvolvedor com o erro abaixo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>ERROR ID {modalBody.id_error}</h2>
                {modalBody.body_text}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} color='red' appearance="primary">
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer />
        <Panel
            className='browselize-list'
        >
            <Content className="browser-content">
                <Col>
                    <label>Listagem de {pageTranslateName}</label>
                </Col>
                <Col>
                    <ButtonToolbar>
                        <IconButton appearance="primary" color="green" icon={<PlusIcon />} placement="left">Novo</IconButton>
                    </ButtonToolbar>
                </Col>
            </Content>
            <Divider />
            <Row>
                <TableList
                    loading={isLoading}
                    data={dataTable}
                />
            </Row>
        </Panel>
    </>

    )
}

export default Browserlize