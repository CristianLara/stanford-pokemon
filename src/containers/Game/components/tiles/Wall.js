import Tile from './Tile';

class Wall extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'wall';
    this.walkable = false;
    this.animated = false;
  }

  static height = 5;
  static width = 5;
}

export default Wall;
