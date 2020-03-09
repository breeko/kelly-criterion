import React from "react"
import SummaryRow from "./SummaryRow"
import { populationBuckets } from "../bucketNumbers"

interface SummaryTableProps {
    results: Summary
    altResults: Summary
}

const SummaryTable: React.FunctionComponent<SummaryTableProps> = ({results, altResults}) => {
    
    return(
        <React.Fragment>
            <table className="bp3-html-table .modifier">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>User</th>
                        <th>Kelly</th>
                        <th>Kelly vs User Diff</th>
                    </tr>
                </thead>
                <tbody>
                    <SummaryRow title="Median Return" value={results.median} altValue={altResults.median}/>
                    <SummaryRow title="Mean Return" value={results.mean} altValue={altResults.mean}/>
                    <SummaryRow title="Max Return" value={results.max} altValue={altResults.max}/>
                    <SummaryRow title="Min Return" value={results.min} altValue={altResults.min}/>
                    <SummaryRow title="Percent Made Money" value={results.percWin} altValue={altResults.percWin}/>
                    <SummaryRow title="Percent Didn't Bust" value={results.percNotZero} altValue={altResults.percNotZero}/>
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default SummaryTable
