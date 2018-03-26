import React from 'react';
import Styled from 'styled-components';
import Flower from '../tiles/Flower';
import Grass from '../tiles/Grass';

const tileSize = 36;

const Row = Styled.div`
  height: ${tileSize}px;
  width: max-content;
`;

class RandomMap extends React.Component {
  constructor(props) {
    super(props);

    const height = window.innerHeight;
    const width = window.innerWidth;

    this.state = {
      height: height,
      width: width,
    }

    this.grid = [];
    this.gridRefs = [];
    this.map = {}

    this.updateTileDepth = this.updateTileDepth.bind(this);
    this.addMapFeatures = this.addMapFeatures.bind(this);
  }

  addMapFeatures(numTilesY, numTilesX) {
    const middleX = Math.floor(numTilesX / 2);
    const middleY = Math.floor(numTilesY / 2);
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

  fillInGrass(numTilesY, numTilesX) {
    for (let y = 0; y < numTilesY; y++) {
      if (!this.grid[y]) this.grid[y] = [];
      if (!this.gridRefs[y]) this.gridRefs[y] = [];

      for (let x = 0; x < numTilesX; x++) {
        if (!this.grid[y][x]) {
          this.grid[y][x] = (
            <Grass
              key={x}
              ref={ (instance) => this.gridRefs[y][x] = instance }
            />
          );
        }
      }
      this.grid[y] = <Row key={y}>{this.grid[y]}</Row>
    }
  }

  componentWillMount() {
    const { height, width } = this.state;
    const numTilesY = Math.ceil(height / tileSize);
    const numTilesX = Math.floor(width / tileSize);

    this.addMapFeatures(numTilesY, numTilesX);
    this.fillInGrass(numTilesY, numTilesX);
  }

  componentWillReceiveProps(nextProps) {
    this.updateTileDepth(nextProps);
  }

  updateTileDepth(nextProps) {
    const { width, height } = this.state;
    const { x, y } = this.props.spritePosition;
    if ((0 <= x) && (x < width) && (0 <= y) && (y < height)) {
      if (this.gridRefs[y][x].setDepth) {
        this.gridRefs[y][x].setDepth(false);
      }
    }

    const nextX = nextProps.spritePosition.x;
    const nextY = nextProps.spritePosition.y;
    if ((0 <= nextX) && (nextX < width) && (0 <= nextY) && (nextY < height)) {
      if (this.gridRefs[nextY][nextX].setDepth) {
        this.gridRefs[nextY][nextX].setDepth(true);
      }
    }
  }

  render() {
    return (
      [this.grid]
    );
  }

}

export default RandomMap;
