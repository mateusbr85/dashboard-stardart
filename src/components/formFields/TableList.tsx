import { useEffect, useState } from 'react';
import { Table } from 'rsuite';


interface TableProps {
    loading: boolean;
    data: {
        pagination: {
            currentPage: number;
            perPage: number;
            totalPages: number;
            totalItems: number;
        },
        registros: [{}]
    }
}


const TableList = ({ ...props }: TableProps) => {
    // UseStates
    const [dataTable, setDataTable] = useState([])


    // UseEffect
    useEffect(() =>{
        toSeparateDataTable(props.data)
    },[props.data])

    // Functions
    const toSeparateDataTable = (data: any) => {
        console.log('teste :::> ', data)
        setDataTable(data.registros)

    }


    return(<>
        <Table
            loading={props.loading}
            data={dataTable}
        >
            
        </Table>
    </>)
}

export {TableList}