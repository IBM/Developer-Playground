import { LineChart } from "@carbon/charts-react";
import React from "react";
import "@carbon/charts/styles.css";

const CarbonChart = ({data}) => {
    const options= {
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
        "toolbar": {
            "enabled": true,
            "controls": [
              {
                "type": "Zoom in"
              },
              {
                "type": "Zoom out"
              },
              {
                "type": "Reset zoom"
              }
            ]
          },
        "zoomBar": {
            "top": {
              "enabled": true
            }},
        
        "getStrokeColor": (group,label, data) => {
            if(data && data.anomaly)
                return "red"
        },
        "curve": "curveMonotoneX",
        "height": "400px",
    }
return (
    <LineChart
        data={data}
        options={options}
        onSubmit={e => e.preventDefault()}>
    </LineChart>
)
}

export default CarbonChart;