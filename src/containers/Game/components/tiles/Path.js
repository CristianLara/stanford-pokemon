import Tile from './Tile';

class Path extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'path';
    this.walkable = true;
    this.animated = false;
  }


  static height = 3;
  static width = 3;
}

export default Path;
