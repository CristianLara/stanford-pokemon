import React from 'react';
// import RandomMap from './components/maps/RandomMap'
import OvalMap from './components/maps/OvalMap'
import Player from './components/Player'

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: OvalMap,
      spritePosition: {x: 1, y: 1},
    };

    this.map = undefined;
    this.updatePosition = this.updatePosition.bind(this);
    this.isValidPosition = this.isValidPosition.bind(this);
  }

  updatePosition(position) {
    this.setState({ spritePosition: {x: position.x, y: position.y} })
  }

  isValidPosition(y, x) {
    const height = this.map.gridRefs.length;
    var width = 0;
    if (height > 0) {
      width = this.map.gridRefs[0].length;
    }
    if ((0 <= x) && (x < width) && (0 <= y) && (y < height)) {
      return this.map.gridRefs[y][x].walkable;
    }
  }

  render() {
    const { spritePosition } = this.state;

    return (
      <div>
        <Player isValid={this.isValidPosition} updatePosition={this.updatePosition}/>
        <this.state.map
          ref={ (instance) => this.map = instance }
          spritePosition={spritePosition}
        />
      </div>
    );
  }

}

export default Game;
