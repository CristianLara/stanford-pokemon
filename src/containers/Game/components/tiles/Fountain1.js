import Tile from './Tile';

class Fountain1 extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'fountain1';
    this.walkable = false;
    this.animated = true;
    this.steps = 19;
    this.large = true;
    this.rate = 40;
  }

  static height = 5;
  static width = 5;
  static animated = true;
  static rate = 40;
}

export default Fountain1;
