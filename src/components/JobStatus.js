import {
    TableContainer,
    CodeSnippet,
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    Loading,
    ToastNotification
} from 'carbon-components-react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyFile24, Renew32 } from '@carbon/icons-react';
import axios from 'axios'
import { useState } from 'react'


const JobStatus = ({ jobId, msg }) => {
    const [status, setStatus] = useState(msg)
    const [loading, setLoading] = useState(false)
    const [showNotif, setNotification] = useState(false)
    const [notifData, setNotifData] = useState({
        kind: "",
        subtitle: "",
        title: ""
    })
    const updateJobStatus = async () => {
        try {
            setLoading(true)
            let res = await axios.get(`/status?jobid=${jobId}`)
            setStatus(res.data.status)
        } catch(err) {
            setNotifData({
                kind: "error",
                subtitle: err.response.data.msg,
                title: "Error"
              })
              setNotification(true)
        } finally {
            setLoading(false)
        }
    }
    const headers = [
        {
            key: 'jobid',
            header: 'Job ID',
        },
        {
            key: 'message',
            header: 'Message',
        },
        {
            key: 'copyfunc',
            header: ''
        },
        {
            key: 'refresh',
            header: ''
        }

    ];
    const rows = [
        {
            id: 'a',
            jobid: jobId,
            message: status,
            copyfunc: <CopyToClipboard text={jobId}>
                <CodeSnippet type="inline" feedback="Copied to clipboard" ><CopyFile24 Style="width: 24px ; height: 24px" /></CodeSnippet>
            </CopyToClipboard>,
            refresh: <Renew32 Style="width: 24px ; height: 24px" onClick={updateJobStatus} />

        }]
    return (
        <>
            <DataTable rows={rows} headers={headers}>
                {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) =>
                (
                    <TableContainer title="Parameter Job">
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
                                    <TableRow {...getRowProps({ row })}>
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
            <Loading active={loading} overlay={true} />
            {showNotif ?
                <ToastNotification
                    kind={notifData.kind}
                    iconDescription="Close notification"
                    subtitle={<span>{notifData.subtitle}</span>}
                    timeout={3000}
                    onCloseButtonClick={() => setNotification(false)}
                    title={notifData.title}
                    caption=""
                /> : null}
        </>
    )
}

export default JobStatus