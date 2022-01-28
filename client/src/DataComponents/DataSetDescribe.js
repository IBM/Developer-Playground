import React,{Component} from 'react';
import {DataTable,TableContainer,Table,TableHead,TableHeader,TableRow,TableBody,TableCell} from 'carbon-components-react';
class DataSetDescribe extends Component{
    render(){
        const headerData = [
            {
              header: 'Input Field',
              key: 'input_field',
            },
            {
              header:'Description',
              key:'description',
            },
            
          ];
          
          const rowData = [
            {
              id:1,
              input_field:'Tenure',
              description:"Number of months the customer has stayed with the company.",
            },
            {
              id:2,
              input_field:'Monthly Charges',
              description:"Monthly fee to be paid by the customer.",
            },
            {
              id:3,
              input_field:'Online Security',
              description:"Did the customer register for network security?",
            },
            {
              id:4,
              input_field:'Technical Support',
              description:"Did the customer took any technical support?",
            },
            {
              id:5,
              input_field:'Phone Service',
              description:"Did the customer register for phone service?",
            },
            {
              id:6,
              input_field:'Dependents',
              description:"Do the customer have dependents (eg. child, minor brother/sister, parents)?",
            },
            
            {
              id:7,
              input_field:'Device Protection',
              description:"Did the customer register for device protection?",
            },
            {
              id:8,
              input_field:'Paperless billing',
              description:"Do the customer receive an electronic version of a bill instead of a paper bill?",
            },
            {
              id:9,
              input_field:'Online Backup',
              description:"Is the customer taking online backups of the data?",
            },
            {
              id:10,
              input_field:'Internet Service',
              description:"Did the customer register for internet service?",
            },
            {
              id:11,
              input_field:'Contract',
              description:"Did the customer sign the telecommunications contracts?",
            },
            {
              id:12,
              input_field:'Payment Method',
              description:"What mode of payment do the customer use?",
            },
          ];
        return(
            <div style={{marginLeft:'3rem'}}>
                <DataTable rows={rowData} headers={headerData} >
                    {({ rows, headers, getHeaderProps, getTableProps }) => (
                    <TableContainer title="Data set description">
                        <Table {...getTableProps()}>
                        <TableHead>
                            <TableRow>
                            {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })}>
                                {header.header}
                            </TableHeader>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                            <TableRow key={row.id}>
                            {row.cells.map((cell) => (
                                <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                            </TableRow>
                        ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    )}
                </DataTable>
</div>
        )
    }
}
export default DataSetDescribe