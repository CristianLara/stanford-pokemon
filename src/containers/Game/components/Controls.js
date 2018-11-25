import React from 'react';
import Styled from 'styled-components';
import { Glyphicon, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../../../Fonts/fonts.css';

const Bar = Styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  width = 100px;
  z-index:999;
  transition: all 2s;
`;

const VolumeButton = Styled(ToggleButton)`
  background-color: rgba(255,255,255, 0.5) !important;
  border-color: rgba(255,255,255, 0) !important;
  box-shadow: inset 0 3px 5px rgba(0,0,0,0) !important;
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
      sound: SOUND.off,
      values: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(values) {
    this.setState({ values: values })
    var setting = SOUND.off;
    if (values.includes(SETTINGS.sound)) {
      setting = SOUND.on;
    }
    this.setState({ sound: setting });
    this.props.toggleSound();
  }

  render() {
    const { sound, values } = this.state;
    const soundGlyph = sound === SOUND.on ? 'volume-up' : 'volume-off';

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
      </Bar>
    )
  }

}

export default ControlsBar;
