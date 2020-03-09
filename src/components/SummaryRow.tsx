import React from "react"

interface SummaryRowProps {
    title: string
    value: number
    altValue: number
}

const SummaryRow: React.FunctionComponent<SummaryRowProps> = ({title, value, altValue}) => {
    const diff = altValue - value 
    const MAX_VALUE = 1e+9
    return(
        <tr>
            <td>{title}</td>
            <td>{Math.abs(value) > MAX_VALUE ? value.toExponential(2) : value.toLocaleString()}</td>
            <td>{Math.abs(altValue) > MAX_VALUE ? altValue.toExponential(2) : altValue.toLocaleString()}</td>
            <td style={diff >= 0 ? {color: "green"} : {color: "red"}}>
                {Math.abs(diff) > MAX_VALUE ? diff.toExponential(2) : diff.toLocaleString()}</td>
        </tr>
    )
}

export default SummaryRow
