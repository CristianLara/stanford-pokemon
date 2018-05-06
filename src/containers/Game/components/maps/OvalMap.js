import Flower from '../tiles/Flower';
import Tree from '../tiles/Tree';
import Path from '../tiles/Path';
import Map from './Map';
import MemorialCourtMap from './MemorialCourtMap';

class OvalMap extends Map {
  constructor(props) {
    super(props);

    this.name = 'Oval';
    this.addPaths = this.addPaths.bind(this);
    this.addTrees = this.addTrees.bind(this);
    this.transitions = {
      up: MemorialCourtMap,
    };
  }

  addMapFeatures() {
    this.addShape(Flower, [
      [ 1, 1, 1, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 0, 0, 0 ],
      [ 1, 1, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
    ]);
    this.addPaths();
    this.addTrees();
  }

  addPaths() {
    const pathHeight = this.numTilesY;
    const pathWidth = 3;

    const startY = 0;
    const startX1 = Math.floor(this.numTilesX / 4) - Math.ceil(pathWidth - 2);
    const startX2 = Math.floor(this.numTilesX / 4 * 3) - Math.ceil(pathWidth - 2);
    this.addTile(Path, startX1, startY, pathWidth, pathHeight, true);
    this.addTile(Path, startX2, startY, pathWidth, pathHeight, true);
  }

  addTrees() {
    const posY = [0, Math.floor(this.numTilesY/2)-2, this.numTilesY-1-4];
    const posX = [0, this.numTilesX-3];

    posY.forEach((y) => {
      posX.forEach((x) => {
        this.addTile(Tree, x, y, Tree.width, Tree.height);
      });
    });
  }

}

export default OvalMap;
