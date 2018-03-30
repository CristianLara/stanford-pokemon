import Tile from './Tile';

class Tree extends Tile {
  constructor(props) {
    super(props);

    this.type = 'tree';
    this.walkable = false;
    this.animated = false;
    this.width = 3;
    this.height = 4;
  }
}

export default Tree;
