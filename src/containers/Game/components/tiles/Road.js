import Tile from './Tile';

class Road extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'road';
    this.walkable = true;
    this.animated = false;
  }

  static height = 3;
  static width = 3;
}

export default Road;
