import Tile from './Tile';

class Streetlight extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'streetlight';
    this.animated = false;
  }

  static height = 3;
  static width = 1;
  static blockingHeight = 2;
}

export default Streetlight;
