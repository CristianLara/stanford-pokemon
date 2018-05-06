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
    this.addStatues = this.addStatues.bind(this);
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

  addStatues(x, y) {
    const height = 2;
    const width = 1;
    const startY1 = y + 1;
    const startX1 = x + 1;
    this.addTile(Statue, startX1, startY1, width, height);
    this.addTile(Statue, startX1+1, startY1, width, height);
    this.addTile(Statue, startX1+2, startY1, width, height);
    this.addTile(Statue, startX1, startY1+2, width, height);
    this.addTile(Statue, startX1+1, startY1+2, width, height);
    this.addTile(Statue, startX1+2, startY1+2, width, height);
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
    this.addTile(Fountain, centerX + 3, centerY + 2, Fountain.width, Fountain.height);
  }

  addTrees() {
    const startX1 = Math.floor(this.numTilesX / 2) - Math.floor(11 / 2) - 5;
    const startX2 = Math.floor(this.numTilesX / 2) - Math.floor(11 / 2) + 13;

    const yTop = Math.floor(this.numTilesY / 3) * 2 - 2 - Tree.height;
    const yBottom = Math.floor(this.numTilesY / 3) * 2 + 1;

    // sides
    for (let x = 0; x < 10; x++) {
      if (startX2 + Tree.width * x > this.numTilesX) break;
      this.addTile(Tree, startX2 + Tree.width * x, yTop, Tree.width, Tree.height);
      this.addTile(Tree, startX2 + Tree.width * x, yBottom, Tree.width, Tree.height);
    }
    for (let x = 0; x < 10; x++) {
      if (startX1 - Tree.width * x < -Tree.width) break;
      this.addTile(Tree, startX1 - Tree.width * x, yTop, Tree.width, Tree.height);
      this.addTile(Tree, startX1 - Tree.width * x, yBottom, Tree.width, Tree.height);
    }

    // bottom
    for (let x = 0; x < 4; x++) {
      this.addTile(Tree, startX1 + 3 + (Tree.width + 1) * x, this.numTilesY - 3, Tree.width, Tree.height);
    }

    // top
    this.addTile(Tree, startX1 + 3, yTop - 2, Tree.width, Tree.height);
    this.addTile(Tree, startX2 - 3, yTop - 2, Tree.width, Tree.height);

    // add lights
    this.addTile(Streetlight, startX1 + 4, yTop + 2, Streetlight.width, Streetlight.height);
    this.addTile(Streetlight, startX1 + 4, yBottom, Streetlight.width, Streetlight.height);

    this.addTile(Streetlight, startX2 - 2, yTop + 2, Streetlight.width, Streetlight.height);
    this.addTile(Streetlight, startX2 - 2, yBottom, Streetlight.width, Streetlight.height);
  }

}

export default HooverTowerMap;
