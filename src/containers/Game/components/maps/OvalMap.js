import React from 'react';
import Flower from '../tiles/Flower';
import Path from '../tiles/Path';
import Tree from '../tiles/Tree';
import Map from './Map';

class OvalMap extends Map {
  constructor(props) {
    super(props);

    this.addFlowers = this.addFlowers.bind(this);
    this.addPaths = this.addPaths.bind(this);
    this.addTrees = this.addTrees.bind(this);
    this.addTree = this.addTree.bind(this);
  }

  addMapFeatures(numTilesY, numTilesX) {
    this.addFlowers(numTilesY, numTilesX);
    this.addPaths(numTilesY, numTilesX);
    this.addTrees(numTilesY, numTilesX);
  }

  addFlowers(numTilesY, numTilesX) {
    const middleX = Math.floor(numTilesX / 2);
    const middleY = Math.floor(numTilesY / 2);

    // flower
    const flowerShape = [
      [ 1, 1, 1, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 0, 0, 0 ],
      [ 1, 1, 1, 1 ],
      [ 0, 0, 0, 1 ],
      [ 1, 0, 0, 1 ],
      [ 1, 1, 1, 1 ],
    ]
    const startY = middleY - Math.ceil(flowerShape.length / 2);
    const startX = middleX - Math.ceil(flowerShape[0].length / 2);
    for (let y = 0; y < flowerShape.length; y++) {
      this.grid[startY + y] = [];
      this.gridRefs[startY + y] = [];
      for (let x = 0; x < flowerShape[0].length; x++) {
        if (flowerShape[y][x]) {
          this.grid[startY + y][startX + x] = (
            <Flower
              key={startX + x}
              ref={ (instance) => this.gridRefs[startY + y][startX + x] = instance }
            />
          );
        }
      }
    }
  }

  addPaths(numTilesY, numTilesX) {
    const pathHeight = numTilesY;
    const pathWidth = 3;

    const startY = 0;
    const startX1 = Math.floor(numTilesX / 4) - Math.ceil(pathWidth - 2);
    const startX2 = Math.floor(numTilesX / 4 * 3) - Math.ceil(pathWidth - 2);

    for (let y = 0; y < pathHeight; y++) {
      if (!this.grid[y]) this.grid[y] = [];
      if (!this.gridRefs[y]) this.gridRefs[y] = [];
      var ypos = 'mid';

      for (let x = 0; x < pathWidth; x++) {
        var xpos = this.getPositionLabelX(pathWidth, x);
        const position = `${ypos}_${xpos}`;
        // add left path
        this.grid[startY + y][startX1 + x] = (
          <Path
            key={startX1 + x}
            position={position}
            ref={ (instance) => this.gridRefs[startY + y][startX1 + x] = instance }
          />
        );
        // add right path
        this.grid[startY + y][startX2 + x] = (
          <Path
            key={startX2 + x}
            position={position}
            ref={ (inst) => this.gridRefs[startY + y][startX2 + x] = inst }
          />
        );
      }
    }
  }

  addTree(startX, startY) {
    const height = 4;
    const width = 3;

    for (let y = 0; y < height; y++) {
      if (!this.grid[startY + y]) this.grid[startY + y] = [];
      if (!this.gridRefs[startY + y]) this.gridRefs[startY + y] = [];
      var ypos = this.getPositionLabelYTall(height, y);

      for (let x = 0; x < width; x++) {
        var xpos = this.getPositionLabelX(width, x);
        const position = `${ypos}_${xpos}`;

        this.grid[startY + y][startX + x] = (
          <Tree
            key={startX + x}
            position={position}
            ref={ (instance) => this.gridRefs[startY + y][startX + x] = instance }
          />
        );
      }
    }
  }

  addTrees(numTilesY, numTilesX) {
    const posY = [0, Math.floor(numTilesY/2)-2, numTilesY-1-4];
    const posX = [0, numTilesX-3];

    posY.forEach((y) => {
      posX.forEach((x) => {
        this.addTree(x, y);
      });
    });
  }

}

export default OvalMap;
