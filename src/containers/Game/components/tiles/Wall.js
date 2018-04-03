import Tile from './Tile';

class Wall extends Tile {
  constructor(props) {
    super(props);

    this.type = 'wall'
    this.walkable = false;
    this.animated = false;
  }

  static height = 4;
  static width = 4;
}

export default Wall;
