import React from 'react';
import Styled from 'styled-components';
import _ from 'underscore';

const Sprite = Styled.img`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  transition: ${(props) => props.animate ? 'all 0.24s linear' : ''};
  z-index: 10;
`;

const keyMap = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stepSize: 36,
      direction: 'down',
      step: 0,
    }

    this.run = false;
    this.animate = true;
    this.preventAnimation = this.preventAnimation.bind(this);
    this.allowAnimation = this.allowAnimation.bind(this);
    this.walk = this.walk.bind(this);
    this.enableRun = this.enableRun.bind(this);
    this.disableRun = this.disableRun.bind(this);
  }

  preventAnimation() {
    this.animate = false;
  }

  allowAnimation() {
    this.animate = true;
  }

  componentWillMount() {
    document.addEventListener("keydown", this.preventScroll);
    document.addEventListener("keydown", _.throttle(this.walk, 240));
    document.addEventListener("keydown", this.enableRun);
    document.addEventListener("keyup", this.disableRun);
  }

  enableRun(event) {
    if (event.which === 88) this.run = true;
  }

  disableRun(event) {
    if (event.which === 88) this.run = false;
  }

  preventScroll(event) {
    if (Object.values(keyMap).includes(event.which)) {
      event.preventDefault();
    }
  }

  walk(event) {
    let { direction, step } = this.state;
    var gridPosition = { x: this.props.position.x, y: this.props.position.y };
    const isValid = this.props.isValid;
    this.animate = true;
    var numSteps = 1;
    if (this.run) numSteps += 1;

    if (Object.values(keyMap).includes(event.which)) {
      step = 1;
    }

    switch(event.which) {
      case keyMap.left:
        direction = 'left';
        if (isValid(gridPosition.y, gridPosition.x-1)) {
          if (isValid(gridPosition.y, gridPosition.x-numSteps)) {
            gridPosition.x -= numSteps;
          } else {
            gridPosition.x -= 1;
          }
        }
        break;
      case keyMap.up:
        direction = 'up';
        if (isValid(gridPosition.y-1, gridPosition.x)) {
          if (isValid(gridPosition.y-numSteps, gridPosition.x)) {
            gridPosition.y -= numSteps;
          } else {
            gridPosition.y -= 1;
          }
        }
        break;
      case keyMap.right:
        direction = 'right';
        if (isValid(gridPosition.y, gridPosition.x+1)) {
          if (isValid(gridPosition.y, gridPosition.x+numSteps)) {
            gridPosition.x += numSteps;
          } else {
            gridPosition.x += 1;
          }
        }
        break;
      case keyMap.down:
        direction = 'down';
        if (isValid(gridPosition.y+1, gridPosition.x)) {
          if (isValid(gridPosition.y+numSteps, gridPosition.x)) {
            gridPosition.y += numSteps;
          } else {
            gridPosition.y += 1;
          }
        }
        break;
      default:
        break;
    }

    this.props.updatePosition(gridPosition);
    this.setState({ direction: direction, step: step });
  }

  componentDidUpdate(prevProps, prevState) {
    const { step, direction } = this.state;
    if (step !== 0) {
      var stepLimit = 9;
      stepLimit = 8;
      setTimeout(() => {
          this.setState({ step: (step + 1) % stepLimit });
      }, 30);
    }
  }

  render() {
    const { direction, step, stepSize } = this.state;
    const gridPosition = this.props.position;
    const spriteSource = require(`../../../graphics/sprites/${direction}${step}.png`);
    const x = 4 + gridPosition.x * stepSize;
    const y = -16 + gridPosition.y * stepSize;
    return (
      <Sprite src={spriteSource} animate={this.animate} x={x} y={y}></Sprite>
    );
  }

}

export default Player;
