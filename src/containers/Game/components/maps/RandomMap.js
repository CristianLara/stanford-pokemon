import React from 'react';
import Styled from 'styled-components';
import Random from '../tiles/Random';
import Map from './Map';

class RandomMap extends Map {
  constructor(props) {
    super(props);
  }

  addMapFeatures(numTilesY, numTilesX) {
    for (let y = 0; y < numTilesY; y++) {
      if (!this.grid[y]) this.grid[y] = [];
      if (!this.gridRefs[y]) this.gridRefs[y] = [];

      for (let x = 0; x < numTilesX; x++) {
        this.grid[y][x] = (
          <Random
            key={x}
            ref={ (instance) => this.gridRefs[y][x] = instance }
          />
        );
      }
    }
  }

}

export default RandomMap;
