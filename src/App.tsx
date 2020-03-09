import React, { useState, useEffect } from 'react';
import { Button,  NumericInput, Divider, Checkbox, ButtonGroup } from "@blueprintjs/core";
import './App.css';
import { play, randBetween } from './utils';
import SummaryTable from './components/SummaryTable';

function App() {
  const [probWin, setProbWin] = useState(52)
  const [winPayout, setWinPayout] = useState(1)
  const [numSteps, setNumSteps] = useState(100000)
  const [numGames, setNumGames] = useState(10)
  const [wager, setWager] = useState(0)
  const [fixedWager, setFixedWager] = useState(false)
  const [minWager, setMinWager] = useState(0)
  const [kellyWager, setKellyWager] = useState(0)
  const [canPlay, setCanPlay] = useState(false)
  const [results, setResults] = useState<Summary>()
  const [kellyResults, setKellyResults] = useState<Summary>()
  
  const bankroll = 100

  useEffect(() => {
    const updated = Math.max(0, ((probWin / 100) - ((1 - probWin / 100) / winPayout)) * 100)
    setKellyWager(updated)
  }, [wager, probWin, winPayout])

  useEffect(() => {
    const valid = minWager !== undefined
      && probWin >= 0
      && probWin <= 100
      && winPayout >= 0
      && ((wager !== undefined && wager <= 100) || fixedWager)
      && minWager >= 0
      && minWager <= bankroll
      && numSteps > 0
      && numGames > 0
    setCanPlay(valid)
  }, [probWin, winPayout, wager, minWager, numSteps, numGames, fixedWager])

  const runGame = () => {
    if (minWager !== undefined) {
      const baseAssumptions = {
        bankroll,
        numSteps,
        numGames,
        probWin,
        minWager,
        winPayout,
        wager: fixedWager || wager === undefined ? 0 : wager,
      }
      const r = play({...baseAssumptions})
      const kr = play({...baseAssumptions, wager: kellyWager, minWager: 0})
      setResults(r)
      setKellyResults(kr)
    }
  }

  const randomize = () => {
    const newProbWin = randBetween(50, 60)
    const newWinPayout = randBetween(50, 200) / 100.0
    setProbWin(newProbWin)
    setWinPayout(newWinPayout)
  }

  return (
    <div className="App bp3-dark">
      <h1 className="bp3-heading">Kelly Criterion</h1>
      <div className=".modifier">
        Kelly Criterion is a formula to determine the optimal bet size depending on your
        odds and probability of winning. It's equal to
        <br/><br/>
        <code>
          percent_wager = (prob_win * payout_perc - (1 - prob_win)) / payout_perc
        </code>
        <br/><br/>
        Put in some numbers below and run simulations.
      </div>
      <Divider/>
      <ButtonGroup minimal>
        <Button large disabled={!canPlay} onClick={runGame}>Play</Button>
        <Button large onClick={randomize}>Randomize</Button>
      </ButtonGroup>
      <Divider/>
      <table className="bp3-html-table .modifier" style={{float:"left"}}>
        <tbody>
          <tr>
            <td><h2 className="bp3-heading">Strategy</h2></td>
          </tr>
          <tr>
            <td>Wager Percent</td>
            <td><NumericInput min={0} max={bankroll} disabled={fixedWager} onValueChange={v => (typeof(v) === "number" && !Number.isNaN(v)) ? setWager(v): null} value={wager}/></td>
          </tr>
          <tr>
            <td>Minimum Wager</td>
            <td><NumericInput min={0} max={bankroll} onValueChange={v => (typeof(v) === "number" && !Number.isNaN(v)) && setMinWager(v)} value={minWager}/></td>
          </tr>
          <tr>
            <td>Optimal Wager Percent</td>
            <td>{kellyWager?.toFixed(2)}</td>
          </tr>
          <tr>
            <td>
              <Checkbox label="Fixed Wager" checked={fixedWager} onClick={() => setFixedWager(!fixedWager)} />
            </td>
          </tr>
          <tr>
            <td>
              <h2 className="bp3-heading">Game</h2>
            </td>
          </tr>
          <tr>
            <td>Probability Win</td>
            <td><NumericInput min={0} max={100} onValueChange={v => (typeof(v) === "number" && !Number.isNaN(v)) && setProbWin(v)} value={probWin}/></td>
          </tr>
          <tr>
            <td>Win Payout</td>
            <td><NumericInput min={0} onValueChange={v => (typeof(v) === "number" && !Number.isNaN(v)) && setWinPayout(v)} value={winPayout}/></td>
          </tr>
          <tr>
            <td>Number of Steps</td>
            <td><NumericInput min={0} onValueChange={v => (typeof(v) === "number" && !Number.isNaN(v)) && setNumSteps(v)} value={numSteps}/></td>
          </tr>
          <tr>
            <td>Number of Games</td>
            <td><NumericInput min={0} onValueChange={v => (typeof(v) === "number" && !Number.isNaN(v)) && setNumGames(v)} value={numGames}/></td>
          </tr>
        </tbody>
      </table>
      <h2 className="bp3-heading">Results</h2>
      {results && kellyResults ?
        <SummaryTable results={results} altResults={kellyResults}/> :
        null}

    </div>
  );
}

export default App;
