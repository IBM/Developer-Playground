import { LineChart } from "@carbon/charts-react";
import { useState } from "react";
import "@carbon/charts/styles.css";
import tutorial from '../file_example_MP4_480_1_5MG.mp4'
import { Modal } from 'carbon-components-react';



const CarbonChart = ({ data }) => {
    const [open, setOpen] = useState(false)
    const options = {
        "title": "Results",
        "axes": {
            "bottom": {
                "title": "Time",
                "mapsTo": "time",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "title": "Value",
                "scaleType": "linear"
            }
        },
        "zoomBar": {
            "top": {
                "enabled": true
            }
        },

        "getStrokeColor": (group, label, data) => {
            if (data && data.anomaly)
                return "red"
        },
        "curve": "curveMonotoneX",
        "height": "400px"
    }
    return (
        <>
            <a href='#' onClick={() => setOpen(true)}>Refer tutorial</a>
            <Modal
                modalLabel="Carbob Charts Tutorial"
                secondaryButtonText="Cancel"
                primaryButtonDisabled="true"
                open={open}
                onRequestClose={() => setOpen(false)}>
                <div style={{display: "flex",alignItems: "center"}}>
                    <video style={{ width: "100%", maxHeight: "100%", margin: "0 auto" }} controls>
                        <source src={tutorial} type="video/mp4" />
                    </video>
                </div>
            </Modal>
            <LineChart
                data={data}
                options={options}
                onSubmit={e => e.preventDefault()}>
            </LineChart>
        </>
    )
}

export default CarbonChart;