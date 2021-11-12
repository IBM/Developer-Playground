const getDataCarbonCharts = (data, timeColumn) => {
    let dataCarbon = []
    console.log(timeColumn)
    data.forEach(row => {
        Object.keys(row).forEach(key => {
            if(key !== timeColumn)
            dataCarbon.push({
                group: key,
                time: row[timeColumn],
                value: row[key]
            })
        })
    })
    //console.log(dataCarbon)
    return dataCarbon
}

module.exports = getDataCarbonCharts;