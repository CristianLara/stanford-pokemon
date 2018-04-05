import Flower from '../tiles/Flower';
import Wall from '../tiles/Wall';
import Path from '../tiles/Path';
import Path2 from '../tiles/Path2';
import Statue from '../tiles/Statue';
import Map from './Map';
import OvalMap from './OvalMap';
import RandomMap from './RandomMap';

class MemorialCourtMap extends Map {
  constructor(props) {
    super(props);

    this.addPaths = this.addPaths.bind(this);
    this.addWalls = this.addWalls.bind(this);
    this.addStatues = this.addStatues.bind(this);
    this.transitions = {
      down: OvalMap,
      left: RandomMap,
    };
  }

  addMapFeatures() {
    this.addShape(Flower, [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 1, 0, 0, 0, 0, 1, 0, 0 ],
      [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
      [ 1, 1, 1, 0, 0, 0, 0, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 1, 1, 1, 0, 0, 0, 0, 1, 1, 1 ],
      [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
      [ 0, 0, 1, 0, 0, 0, 0, 1, 0, 0 ],
    ]);
    this.addPaths();
    this.addWalls();
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
    const pathHeight = this.numTilesY;
    const pathWidth = 4;
    const startY1 = 0;
    const startX1 = Math.floor(this.numTilesX / 2) - Math.ceil(pathWidth - 2);
    this.addTile(Path, startX1, startY1, pathWidth, pathHeight, true);

    const pathHeight2 = 3;
    const pathWidth2 = this.numTilesX;
    const startY2 = Math.floor(this.numTilesY / 2) - Math.ceil(pathHeight2 - 2);
    const startX2 = 0;
    this.addTile(Path, startX2, startY2, pathWidth2, pathHeight2, true);

    const pathHeight3 = 6;
    const pathWidth3 = 5;
    const startY3 = startY2 - pathHeight3 - 1;
    const startX3 = startX1 - pathWidth3 - 5;
    this.addTile(Path2, startX3, startY3+1, pathWidth3, pathHeight3);

    this.addStatues(startX3, startY3+1);
  }

  addWalls() {
    const wallHeight = Wall.height;
    const wallWidth = (this.numTilesX -  4) / 2;
    const startY1 = -2;
    const startX1 = 0;
    this.addTile(Wall, startX1, startY1, wallWidth, wallHeight);

    const startY2 = -2;
    const startX2 = wallWidth + 4;
    this.addTile(Wall, startX2, startY2, wallWidth, wallHeight);

    const startY3 = this.numTilesY - Wall.height + 1;
    const startX3 = 0;
    this.addTile(Wall, startX3, startY3, wallWidth, wallHeight);

    const startY4 = this.numTilesY - Wall.height + 1;
    const startX4 = wallWidth + 4;
    this.addTile(Wall, startX4, startY4, wallWidth, wallHeight);
  }

}

export default MemorialCourtMap;
