import React from 'react';
import Map from './components/Map'
import Player from './components/Player'

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Player/>
        <Map/>
      </div>
    );
  }

}

export default Game;
