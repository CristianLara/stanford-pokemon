import Tower from '../tiles/Tower';
import Road from '../tiles/Road';
import Tree from '../tiles/Tree';
import Streetlight from '../tiles/Streetlight';
import Fountain from '../tiles/Fountain1';
import Statue from '../tiles/Statue';
import Map from './Map';
import MemorialCourtMap from './MemorialCourtMap';

class HooverTowerMap extends Map {
  constructor(props) {
    super(props);

    this.name = 'Hoover Tower';
    this.addPaths = this.addPaths.bind(this);
    this.addTower = this.addTower.bind(this);
    this.addTrees = this.addTrees.bind(this);
    this.transitions = {
      right: MemorialCourtMap,
    };
  }

  addMapFeatures() {
    this.addPaths();
    this.addTower();
    this.addTrees();
  }

  addTower() {
    const x = Math.floor(this.numTilesX / 2) - Math.floor(Tower.width / 2);
    this.addTile(Tower, x, -6, Tower.width, Tower.height);
  }

  addPaths() {
    const pathHeight2 = 3;
    const pathWidth2 = this.numTilesX;
    const startY2 = Math.floor(this.numTilesY / 3) * 2 - Math.ceil(pathHeight2 - 2);
    const startX2 = 0;
    this.addTile(Road, startX2, startY2, pathWidth2, pathHeight2, true);

    const pathHeight = startY2;
    const pathWidth = 3;
    const startY1 = 0;
    const startX1 = Math.floor(this.numTilesX / 2) - Math.ceil(pathWidth - 2);
    this.addTile(Road, startX1, startY1, pathWidth, pathHeight, true);

    const centerWidth = 11;
    const centerHeight = 9;
    const centerY = Tower.height - 7 + 2;
    const centerX = Math.floor(this.numTilesX / 2) - Math.floor(centerWidth / 2);
    this.addTile(Road, centerX, centerY, centerWidth, centerHeight);

    // adding fountain
    this.addObject(Fountain, centerX + 3, centerY + 2);
  }

  addTrees() {
    const startX1 = Math.floor(this.numTilesX / 2) - Math.floor(11 / 2) - 5;
    const startX2 = Math.floor(this.numTilesX / 2) - Math.floor(11 / 2) + 13;

    const yTop = Math.floor(this.numTilesY / 3) * 2 - 2 - Tree.height;
    const yBottom = Math.floor(this.numTilesY / 3) * 2 + 1;

    // sides
    for (let x = 0; x < 10; x++) {
      if (startX2 + Tree.width * x > this.numTilesX) break;
      this.addObject(Tree, startX2 + Tree.width * x, yTop);
      this.addObject(Tree, startX2 + Tree.width * x, yBottom);
    }
    for (let x = 0; x < 10; x++) {
      if (startX1 - Tree.width * x < -Tree.width) break;
      this.addObject(Tree, startX1 - Tree.width * x, yTop);
      this.addObject(Tree, startX1 - Tree.width * x, yBottom);
    }

    // bottom
    for (let x = 0; x < 4; x++) {
      this.addObject(Tree, startX1 + 3 + (Tree.width + 1) * x, this.numTilesY - 3);
    }

    // top
    this.addObject(Tree, startX1 + 3, yTop - 2);
    this.addObject(Tree, startX2 - 3, yTop - 2);

    // add lights
    this.addObject(Streetlight, startX1 + 4, yTop + 2);
    this.addObject(Streetlight, startX1 + 4, yBottom);

    this.addObject(Streetlight, startX2 - 2, yTop + 2);
    this.addObject(Streetlight, startX2 - 2, yBottom);
  }

}

export default HooverTowerMap;
