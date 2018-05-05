import Tile from './Tile';

class Tower extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'tower';
    this.walkable = false;
    this.animated = false;
  }

  static height = 16;
  static width = 7;
}

export default Tower;
