import Tile from './Tile';

class Path extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'path';
    this.walkable = true;
    this.animated = false;
  }

  toggleHD(hd) {
    if (hd) {
      this.setState({ type: 'path_hd' });
    } else {
      this.setState({ type: 'path' });
    }
  }

  static height = 3;
  static width = 3;
}

export default Path;
