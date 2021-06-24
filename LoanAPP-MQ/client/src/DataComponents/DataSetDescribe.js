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
              input_field:'Age',
              description:"Customer's age in completed years",
            },
            {
              id:2,
              input_field:'Experience',
              description:"years of professional experience",
            },
            {
              id:3,
              input_field:'Income',
              description:"Annual income of the customer ($000)",
            },
            {
              id:4,
              input_field:'ZIPCode',
              description:"Home Address ZIP code.",
            },
            {
              id:5,
              input_field:'Family',
              description:"Family size of the customer",
            },
            {
              id:6,
              input_field:'CCAvg',
              description:"Avg. spending on credit cards per month ($000)",
            },
            
            {
              id:7,
              input_field:'Education',
              description:"Education Level. 1: Undergrad; 2: Graduate; 3: Advanced/Professional",
            },
            {
              id:8,
              input_field:'Mortgage',
              description:"Value of house mortgage if any. ($000)",
            },
            {
              id:9,
              input_field:'Personal Loan',
              description:"Did this customer accept the personal loan offered in the last campaign?",
            },
            {
              id:10,
              input_field:'Securities Account',
              description:"Does the customer have a securities account with the bank?",
            },
            {
              id:11,
              input_field:'CD Account',
              description:"Does the customer have a certificate of deposit (CD) account with the bank?",
            },
            {
              id:12,
              input_field:'Online',
              description:"Does the customer use internet banking facilities?",
            },
            {
              id:13,
              input_field:'Credit card',
              description:"Does the customer use a credit card issued by UniversalBank?",
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