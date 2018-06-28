import Tile from './Tile';

class Fountain1 extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'fountain1';
    this.animated = true;
    this.steps = 19;
    this.large = true;
    this.rate = 40;
  }

  static height = 5;
  static width = 5;
  static blockingHeight = 1;
}

export default Fountain1;
