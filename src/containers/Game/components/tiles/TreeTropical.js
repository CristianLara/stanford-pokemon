import Tile from './Tile';

class TreeTropical extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'tree_tropical';
    this.walkable = false;
    this.animated = false;
  }

  static height = 3;
  static width = 3;
}

export default TreeTropical;
