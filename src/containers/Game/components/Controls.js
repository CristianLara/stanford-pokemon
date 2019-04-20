import React from 'react';
import Sound from 'react-sound';
import Styled, { keyframes } from 'styled-components';
import { Glyphicon, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../../../Fonts/fonts.css';

const Bar = Styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 999;
  transition: all 2s;
`;

const spin = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;

const VolumeButton = Styled(ToggleButton)`
  background-color: rgba(255,255,255, 0.5) !important;
  border-color: rgba(255,255,255, 0) !important;
  box-shadow: inset 0 3px 5px rgba(0,0,0,0) !important;

  .glyphicon-refresh {
    animation: ${spin} 1s infinite linear;
  }
`;

const SETTINGS = {
  sound: 1,
}

const SOUND = {
  off: 0,
  on: 1,
}

class ControlsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      musicUrl: require(`../../../sound/music/violet_city.mp3`),
      sound: SOUND.off,
      values: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(values) {
    var setting = SOUND.off;
    if (values.includes(SETTINGS.sound)) {
      setting = SOUND.on;
    }
    this.setState({ sound: setting, values });
    this.props.toggleSound();
  }

  render() {
    const { loaded, musicUrl, sound, values } = this.state;

    let musicElem = null;
    let soundGlyph  = 'volume-off';
    if (sound) {
      if (loaded) {
        soundGlyph = 'volume-up';
      } else {
        soundGlyph = 'refresh';
      }
      musicElem = (
        <Sound
          url={musicUrl}
          playStatus={Sound.status.PLAYING}
          onLoad={() => this.setState({ loaded: true })}
          volume={50}
          loop
        />
      )
    }

    return (
      <Bar>
        <ToggleButtonGroup
          type="checkbox"
          value={values}
          onChange={this.handleChange}
        >
          <VolumeButton value={1}>
            <Glyphicon glyph={soundGlyph} />
          </VolumeButton>
        </ToggleButtonGroup>
        {musicElem}
      </Bar>
    )
  }

}

export default ControlsBar;
