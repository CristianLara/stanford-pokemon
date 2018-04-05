import Tile from './Tile';

class Path2 extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'path2';
    this.walkable = true;
    this.animated = false;
  }

  toggleHD(hd) {
    if (hd) {
      this.setState({ type: 'path2_hd' });
    } else {
      this.setState({ type: 'path2' });
    }
  }

  static height = 3;
  static width = 3;
}

export default Path2;
