import Tile from './Tile';

class Statue extends Tile {
  constructor(props) {
    super(props);

    this.type = 'statue'
    this.walkable = false;
    this.animated = false;
  }

  static height = 2;
  static width = 1;
}

export default Statue;
