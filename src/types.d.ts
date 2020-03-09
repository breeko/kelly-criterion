interface PlayProps {
    numGames: number
    numSteps: number
    bankroll: number
    probWin: number
    wager: number
    minWager: number
    winPayout: number
}

interface Summary {
    min: number
    max: number
    median: number
    mean: number
    percWin: number
    percNotZero: number
    results: number[][]
}