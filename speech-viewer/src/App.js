import { Table, TableBody, TableCell, TableHead, TableRow }from '@material-ui/core'
import React from 'react';
import api from './utils/api'
import './App.css';



class App extends React.Component {
  state = {
    speeches: {},
    presidents: {},
    matches: {},
  }

  byId = (data) => {
    return data.reduce( (byId, d) => {
      return {...byId, [d.id]: d}
    }, {})
  }
  
  async componentDidMount() {
    const speeches = this.byId(await api.getSpeeches());
    const presidents = this.byId(await api.getPresidents());
    const matches = this.byId(await api.getMatches());
    this.setState({
      speeches,
      presidents,
      matches,
    })

  }

  render() {
    return (
      <div>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>Match ID</TableCell>
                <TableCell>President</TableCell>
                <TableCell>Speech</TableCell>
                <TableCell>Page Num</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
          {Object.values(this.state.matches).map(match => {
            const speech = this.state.speeches[match.speech_id];
            const president = this.state.presidents[speech.president_id];
            return (
              <TableRow key={match.id}>
                <TableCell>{match.id}</TableCell>
                <TableCell>{president.name}</TableCell>
                <TableCell>{speech.file}</TableCell>
                <TableCell>{match.page_num}</TableCell>
              </TableRow>
              )})}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default App;
