import Tile from './Tile';

class Brick extends Tile {
  constructor(props) {
    super(props);

    const posY = this.props.index.y % Brick.height;
    const posX = this.props.index.x % Brick.width;
    this.state.position = `${posY}_${posX}`;
    this.state.type = 'brick';
  }

  static height = 2;
  static width = 2;
}

export default Brick;
