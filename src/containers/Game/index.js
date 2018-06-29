import React from 'react';
import Sound from 'react-sound';
// import RandomMap from './components/maps/RandomMap'
// import OvalMap from './components/maps/OvalMap'
// import MemorialCourtMap from './components/maps/MemorialCourtMap'
// import MainQuadMap from './components/maps/MainQuadMap';
import HooverTowerMap from './components/maps/HooverTowerMap';
import Player from './components/Player';
import Controls from './components/Controls';

const SOUND = {
  none: 0,
  bump: 1,
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Map: HooverTowerMap,
      spritePosition: {x: 5, y: 5},
      soundEnabled: false,
      sound: SOUND.none,
      // hd: true,
    };

    this.map = undefined;
    this.hd = true;
    this.updatePosition = this.updatePosition.bind(this);
    this.toggleHD = this.toggleHD.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.allowPlayerAnimation = this.allowPlayerAnimation.bind(this);
    this.isValidPosition = this.isValidPosition.bind(this);
  }

  toggleHD() {
    // this.setState({ hd: !this.state.hd });
    this.hd = !this.hd;
    this.map.toggleHD(this.hd);
  }

  toggleSound() {
    this.setState({ soundEnabled: !this.state.soundEnabled});
  }

  updateMap(newMap, newPosition) {
      if (this.player) this.player.preventAnimation();
      this.setState({ Map: newMap, spritePosition: newPosition });
  }

  allowPlayerAnimation() {
    if (this.player) this.player.allowAnimation();
  }

  updatePosition(newPosition) {
    this.setState({ spritePosition: {x: newPosition.x, y: newPosition.y} });
  }

  isValidPosition(y, x) {
    if (this.map) {
      const height = this.map.gridRefs.length;
      var width = 0;
      if (height > 0) {
        width = this.map.gridRefs[0].length;
      }
      if ((0 <= x) && (x < width) && (0 <= y) && (y < height)) {
        if (this.map.gridRefs[y][x].walkable) {
          this.setState({ sound: SOUND.none });
          return true;
        } else {
          this.setState({ sound: SOUND.bump });
          return false;
        }
      }
    }
  }

  render() {
    const { spritePosition, soundEnabled, sound, Map } = this.state;
    var soundElem = '';
    var url = '';
    if (soundEnabled) {
      if (sound !== SOUND.none) {
        switch(sound) {
          case SOUND.bump:
            url = require(`../../sound/bump.mp3`);
            break;
          default:
            break
        }
        soundElem = (
          <Sound
            url={require(`../../sound/bump.mp3`)}
            playStatus={Sound.status.PLAYING}
          />
        )
      }
    }
    return (
      <div>
        <Controls
          toggleSound={this.toggleSound}
        />
        <Player
          ref={ (instance) => this.player = instance }
          position={spritePosition}
          isValid={this.isValidPosition}
          updatePosition={this.updatePosition}
        />
        <Map
          ref={ (instance) => this.map = instance }
          spritePosition={spritePosition}
          allowSpriteAnimation={this.allowPlayerAnimation}
          updateMap={this.updateMap}
          hd={this.hd}
        />
        {soundElem}
      </div>
    );
  }

}

export default Game;
