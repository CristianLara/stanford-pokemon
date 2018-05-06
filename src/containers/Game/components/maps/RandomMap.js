import React from 'react';
import Random from '../tiles/Random';
import Map from './Map';
import MemorialCourtMap from './MemorialCourtMap';

class RandomMap extends Map {
  constructor(props) {
    super(props);

    this.name = 'Random';
    this.transitions = {
      left: MemorialCourtMap,
    };
  }

  addMapFeatures() {
    for (let y = 0; y < this.numTilesY; y++) {
      if (!this.grid[y]) this.grid[y] = [];
      if (!this.gridRefs[y]) this.gridRefs[y] = [];

      for (let x = 0; x < this.numTilesX; x++) {
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
