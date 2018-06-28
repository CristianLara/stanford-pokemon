import Tile from './Tile';

class Tree extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'tree';
    this.animated = false;
  }

  static height = 4;
  static width = 3;
  static blockingHeight = 2;
}

export default Tree;
