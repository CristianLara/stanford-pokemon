import Tile from './Tile';

class Flower extends Tile {
  constructor(props) {
    super(props);

    this.state.type = 'flowers';
    this.walkable = true;
    this.animated = true;
    this.steps = 5;
  }

}

export default Flower;
