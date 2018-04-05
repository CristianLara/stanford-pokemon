import Tile from './Tile';

class Tree extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'tree';
    // if (this.props.hd) this.state.type += '_hd';
    this.walkable = false;
    this.animated = false;
  }

  toggleHD(hd) {
    if (hd) {
      this.setState({ type: 'tree_hd' });
    } else {
      this.setState({ type: 'tree' });
    }
  }

  static height = 4;
  static width = 3;
}

export default Tree;
