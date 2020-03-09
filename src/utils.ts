export const randBetween = (from: number, to: number) =>
    Math.floor((Math.random() * (to - from)) + from)

export const play = (props: PlayProps) => {
    const {numSteps, numGames, bankroll, probWin, wager, minWager, winPayout} = props
    const percProbWin = probWin / 100

    const results = Array.from({length: numGames}).map(() => {
        const rnd = Array.from({length: numSteps}, () => Math.random())
    
        let lastBal = bankroll
        let cur = [lastBal]
        rnd.forEach(r => {
            const actualWager = Math.min(Math.max(minWager, lastBal * (wager / 100)), lastBal)
            const newBal = percProbWin > r ? lastBal + (actualWager * winPayout) : lastBal - actualWager
            lastBal = newBal
            cur.push(newBal)
        })
        return cur
    })
    const summary = summarize(results)
    return summary
}

const getMedian = (nums: number[]) => {
    const numbers = [...nums]
    var median = 0, numsLen = numbers.length
    numbers.sort()
 
    if (numsLen % 2 === 0) {
        median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } else {
        median = numbers[(numsLen - 1) / 2];
    }
    return median;
}

const getMean = (numbers: number[]) => numbers.reduce((acc, val) => acc + val, 0) / numbers.length;

const summarize = (results: number[][]) => {
    const last = results.map(r => r[r.length - 1])
    const median = getMedian(last)
    const mean = getMean(last)
    const min = Math.min(...last)
    const max = Math.max(...last)
    const percWin = (results.filter(r => r[r.length - 1] > r[0]).length / results.length) * 100
    const percNotZero = (results.filter(r => r[r.length - 1] > 0).length / results.length) * 100
    const summary = {median, mean, min, max, percWin, percNotZero, results}
    return summary
}
