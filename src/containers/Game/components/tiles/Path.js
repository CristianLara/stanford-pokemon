import Tile from './Tile';

class Path extends Tile {
  constructor(props) {
    super(props);

    this.type = 'path';
    this.walkable = true;
    this.animated = false;
  }
}

export default Path;
