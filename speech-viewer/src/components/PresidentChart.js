import React from 'react'
import styled from 'styled-components'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory'

const PresidentChart = ({ speeches, presidents, matches }) => {
  const frequencyMap = Object.values(matches || {}).reduce((map, match) => {
    const speech = speeches[match.speech_id]
    const president = presidents[speech.president_id]
    const ret = { ...map }
    if (!ret[president.id]) ret[president.id] = 0
    ret[president.id]++
    return ret
  }, {})

  const data = Object.entries(frequencyMap).map(
    ([presidentId, numMatches]) => ({
      president: presidents[presidentId].name,
      numMatches,
    })
  )

  const sortedData = data.sort((a, b) => a.numMatches - b.numMatches)

  return (
    <VictoryChart padding={{ left: 75, top: 25, bottom: 25 }}>
      <VictoryLabel
        text="Mentions of environmental issues by president"
        x={225}
        y={10}
        textAnchor="middle"
      />
      <VictoryBar horizontal data={sortedData} x="president" y="numMatches" />
      <VictoryAxis style={{ tickLabels: { fontSize: 5 } }} />
    </VictoryChart>
  )
}

export default PresidentChart
