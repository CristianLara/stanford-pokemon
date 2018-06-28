import Tile from './Tile';

class Statue extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'statue';
    this.animated = false;
  }

  static height = 2;
  static width = 1;
  static blockingHeight = 1;
}

export default Statue;
