import Tile from './Tile';

class Tree extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'tree';
    this.walkable = false;
    this.animated = false;
  }

  static height = 4;
  static width = 3;
}

export default Tree;
