import React from 'react'
import {
  VictoryHistogram,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from 'victory'

const getYear = (speech) => parseInt(speech.date.split('-')[0], 10)

const YearChart = ({ speeches, matches }) => {
  const data = Object.values(matches).map((match) => {
    const speech = speeches[match.speech_id]
    const year = getYear(speech)
    return { x: year }
  })

  return (
    <VictoryChart>
      <VictoryLabel
        text="Mentions of environmental issues by year"
        x={225}
        y={10}
        textAnchor="middle"
      />
      <VictoryHistogram
        data={data}
        bins={40}
        style={{ data: { strokeWidth: 1 } }}
      />
      <VictoryAxis
        dependentAxis
        style={{ tickLabels: { fontSize: 7 } }}
        tickFormat={(t) => t}
      />
      <VictoryAxis
        style={{ tickLabels: { fontSize: 7 } }}
        tickFormat={(t) => t}
      />
    </VictoryChart>
  )
}

export default YearChart
