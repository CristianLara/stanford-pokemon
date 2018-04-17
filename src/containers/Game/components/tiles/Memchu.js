import Tile from './Tile';

class Memchu extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'memchu';
    this.walkable = false;
    this.animated = false;
  }

  static height = 8;
  static width = 9;
}

export default Memchu;
