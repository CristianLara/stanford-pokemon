import React from 'react';
import Map from './components/Map'
import Player from './components/Player'

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spritePosition: {x: 1, y: 1},
    };

    this.updatePosition = this.updatePosition.bind(this);
  }

  updatePosition(position) {
    this.setState({ spritePosition: {x: position.x, y: position.y} })
  }

  render() {
    const { spritePosition } = this.state;

    return (
      <div>
        <Player updatePosition={this.updatePosition}/>
        <Map spritePosition={spritePosition}/>
      </div>
    );
  }

}

export default Game;
