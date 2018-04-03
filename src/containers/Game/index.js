import React from 'react';
// import RandomMap from './components/maps/RandomMap'
// import OvalMap from './components/maps/OvalMap'
import MemorialCourtMap from './components/maps/MemorialCourtMap'
import Player from './components/Player'

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: MemorialCourtMap,
      spritePosition: {x: 3, y: 3},
    };

    this.map = undefined;
    this.updatePosition = this.updatePosition.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.isValidPosition = this.isValidPosition.bind(this);
  }

  updateMap(newMap, newPosition) {
      this.setState({ map: newMap, spritePosition: newPosition });
  }

  updatePosition(newPosition) {
    this.setState({ spritePosition: {x: newPosition.x, y: newPosition.y} });
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
        <Player
          position={spritePosition}
          isValid={this.isValidPosition}
          updatePosition={this.updatePosition}
        />
        <this.state.map
          ref={ (instance) => this.map = instance }
          spritePosition={spritePosition}
          updateMap={this.updateMap}
        />
      </div>
    );
  }

}

export default Game;
