import Tile from './Tile';

class Tree extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'fountain';
    this.walkable = false;
    this.animated = false;
  }

  static height = 5;
  static width = 5;
}

export default Tree;
