import { useEffect, useState } from 'react';
import { Col, Panel, Placeholder, Table, Toggle } from 'rsuite';
import _ from 'lodash';
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
            const sortData = _.fromPairs(
                _.chain(fieldSchema)
                    .toPairs()
                    .sortBy(([, value]) => value.order)
                    .value()
            );
            for (const column in sortData) {
                const widthIs = fieldSchema[column].width * 80
                switch (fieldSchema[column].type) {
                    case 'text':
                        output.push(
                            <Column
                                align='center'
                                resizable
                                width={widthIs}
                            >
                                <HeaderCell>{fieldSchema[column].label}</HeaderCell>
                                <Cell dataKey={column} />
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
                                <HeaderCell>{fieldSchema[column].label}</HeaderCell>
                                <Cell>
                                    {(rowData: any, index: any) => {
                                        return (<>
                                            <Toggle
                                                size='sm'
                                                readOnly
                                                checkedChildren="SIM" unCheckedChildren="NÃO"
                                                defaultChecked={rowData[column]}
                                            />
                                        </>)
                                    }}
                                </Cell>
                            </Column>
                        )
                        break;
                    case 'select':
                        output.push(
                            <Column
                                resizable
                                align='center'
                                width={widthIs}
                            >
                                <HeaderCell>{fieldSchema[column].label}</HeaderCell>
                                <Cell>
                                    {(rowData: any, index: any) => {
                                        const ObjectLabel: any = column.split('_fk_').pop()?.split('_id').shift();
                                        if (column.includes('_fk_')) {
                                            if (rowData[`${ObjectLabel}`]) {
                                                const dataInSelect = rowData[`${ObjectLabel}`]
                                                console.log(fieldSchema[column])
                                                if (fieldSchema[column]?.displayLabel) {
                                                    return (<>
                                                        {dataInSelect[`${fieldSchema[column].displayLabel}`]}
                                                    </>)
                                                } else {
                                                    return (<>
                                                        {dataInSelect[`${ObjectLabel}_text_name`]}
                                                    </>)
                                                }
                                            } else {
                                                return (<>
                                                    Nenhum
                                                </>)
                                            }
                                        }
                                        if(column.includes('_ik_')){
                                            return (<>
                                                {rowData[column]}
                                            </>)
                                        }
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
        return (<div>
            <i style={{ cursor: 'pointer' }} className="fas text-warning fa-fw mr-2 clickable fa-pencil-alt" ></i>
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
                // cellBordered
                renderEmpty={() => <div className="rs-table-body-info">Nenhum item encontrado.</div>}
            >
                {renderColumns()}
                <Column align='center' fixed='right' flexGrow={1}>
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