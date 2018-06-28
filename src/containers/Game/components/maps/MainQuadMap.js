import Wall from '../tiles/Wall';
import Brick from '../tiles/Brick';
import Memchu from '../tiles/Memchu';
import TreeTropical from '../tiles/TreeTropical';
import Map from './Map';
import MemorialCourtMap from './MemorialCourtMap';

class MainQuadMap extends Map {
  constructor(props) {
    super(props);
    this.ground = Brick;

    this.name = 'Main Quad';
    this.addWalls = this.addWalls.bind(this);
    this.addMemchu = this.addMemchu.bind(this);
    this.addTrees = this.addTrees.bind(this);
    this.transitions = {
      down: MemorialCourtMap,
    };
  }

  addMapFeatures() {
    this.addWalls();
    this.addMemchu();
    this.addTrees();
  }

  addMemchu() {
    const startY1 = -2;
    const startX1 = Math.floor(this.numTilesX / 2 - Memchu.width / 2);
    this.addTile(Memchu, startX1, startY1, Memchu.width, Memchu.height);
  }

  addTrees() {
    for (let y = 0; y < 2; y++) {
      const ypos = Math.floor(this.numTilesY / 3) * (1 + y);
      for (let x = 0; x < 4; x++) {
        const xpos = Math.floor(this.numTilesX / 4) * (x) + Math.floor(this.numTilesX / 10);
        this.addObject(TreeTropical, xpos, ypos);
      }
    }

  }

  addWalls() {
    const wallHeight = Wall.height;
    const wallWidth = this.numTilesX;
    const startY1 = 0;
    const startX1 = 0;
    this.addTile(Wall, startX1, startY1, wallWidth, wallHeight);

    const wallWidth2 = Math.ceil((this.numTilesX -  4) / 2);
    const startY3 = this.numTilesY - Wall.height + 1;
    const startX3 = 0;
    this.addTile(Wall, startX3, startY3, wallWidth2, wallHeight);

    const startY4 = this.numTilesY - Wall.height + 1;
    const startX4 = wallWidth2 + 4;
    this.addTile(Wall, startX4, startY4, wallWidth2, wallHeight);
  }

}

export default MainQuadMap;
