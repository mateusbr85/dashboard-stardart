import { useEffect, useState } from 'react';
import { Col, Panel, Placeholder, Table, Toggle } from 'rsuite';
import lodash from 'lodash';
import { IGlobals, ISchema } from '../interfaces/TableList'


const { Column, HeaderCell, Cell } = Table;

interface TableProps {
    loading: boolean;
    data: {
        pagination: {
            currentPage: number;
            perPage: number;
            totalPages: number;
            totalItems: number;
        },
        registros: [{}],
        schema: Record<string, any>
    }
}


const TableList = ({ ...props }: TableProps) => {
    // UseStates
    const [dataTable, setDataTable] = useState([])
    const [schemaTable, setSchemaTable] = useState<IGlobals>({
        $GLOBALS: {
            table: '',
            prefix: '',
            icon_name: '',
            plural_name: '',
            singular_name: '',
            fields: {}
        }
    })


    // UseEffect
    useEffect(() => {
        toSeparateDataTable(props.data)
    }, [props.data])

    // Functions
    const toSeparateDataTable = (data: any) => {
        setDataTable(data.registros)
        setSchemaTable(data.schema)

    }

    const renderColumns = (): JSX.Element[] => {
        const output: JSX.Element[] = [];
        const fieldSchema: Record<string, ISchema> = props.data.schema['$GLOBALS']?.fields
        if (fieldSchema !== undefined) {
            const sortData = lodash.fromPairs(
                lodash.chain(fieldSchema)
                    .toPairs()
                    .sortBy(([, value]) => value.order)
                    .value()
            );
            for (const i in sortData) {
                const widthIs = fieldSchema[i].width * 80
                switch (fieldSchema[i].type) {
                    case 'text':
                        output.push(
                            <Column
                                align='center'
                                resizable
                                width={widthIs}
                            >
                                <HeaderCell>{fieldSchema[i].label}</HeaderCell>
                                <Cell dataKey={i} />
                            </Column>
                        )
                        break;
                    case 'checkbox':
                        output.push(
                            <Column
                                resizable
                                align='center'
                                width={widthIs}
                            >
                                <HeaderCell>{fieldSchema[i].label}</HeaderCell>
                                <Cell>
                                    {(rowData: any, index: any) => {
                                        return (<>
                                            <Toggle
                                                size='sm'
                                                readOnly
                                                checkedChildren="SIM" unCheckedChildren="NÃO"
                                                defaultChecked={rowData[i]}
                                            />
                                        </>)
                                    }}
                                </Cell>
                            </Column>
                        )
                }
            }
        }
        return output
    }

    const renderActions = (rowData: Record<string, ISchema>, rowIndex: any) => {
        return(<div>
            <i style={{cursor: 'pointer'}} className="fas text-warning fa-fw mr-2 clickable fa-pencil-alt" ></i>
        </div>)
    }

    return (<>
        {props.loading ? (<>
            <>
                <Placeholder.Grid rows={5} columns={6} active />
            </>
        </>) : (
            // <Panel>

            // </Panel>
            <Table
                loading={props.loading}
                data={dataTable}
                hover
                // width={}
                height={400}
                cellBordered
                renderEmpty={() => <div className="rs-table-body-info">Nenhum item encontrado.</div>}
            >
                {renderColumns()}
                <Column align='center' flexGrow={1}>
                    <HeaderCell>Ações</HeaderCell>
                    <Cell className="link-group">
                        {(rowData: any, rowIndex: any) => {
                            return renderActions(rowData, rowIndex);
                        }}
                    </Cell>
                </Column>
            </Table>
        )}
    </>)
}

export { TableList }