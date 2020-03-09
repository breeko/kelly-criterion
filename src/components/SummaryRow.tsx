import React from "react"

interface SummaryRowProps {
    title: string
    value: number
    altValue: number
}


const formatNumber = (num: number): string => {
    const MAX_VALUE = 1e+9

    if (Number.isNaN(num)) {
        return `${Number.MAX_VALUE.toExponential(0)}+`
    } else if (num > MAX_VALUE) {
        return num.toExponential(2)
    } else {
        return num.toLocaleString()
    }
}

const SummaryRow: React.FunctionComponent<SummaryRowProps> = ({title, value, altValue}) => {
    let diff = 0
    if (!Number.isNaN(altValue) && !Number.isNaN(value)) {
        diff = altValue - value
    } else if (Number.isNaN(altValue)) {
        diff = Number.MAX_VALUE
    } else if (Number.isNaN(value)) {
        diff = -Number.MAX_VALUE
    }
    
    return(
        <tr>
            <td>{title}</td>
            <td>{formatNumber(value)}</td>
            <td>{formatNumber(altValue)}</td>
            <td style={diff >= 0 ? {color: "green"} : {color: "red"}}>{formatNumber(altValue)}</td>
        </tr>
    )
}

export default SummaryRow
