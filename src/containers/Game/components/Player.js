import React from 'react';
import Styled from 'styled-components';
import _ from 'underscore';

const Sprite = Styled.img`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  transition: ${(props) => props.animate ? 'all 0.'+props.speed+'s linear' : ''};
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
    this.keyPressed = '';
    this.animationTimer = null;
    this.walking = false;
    this.preventAnimation = this.preventAnimation.bind(this);
    this.allowAnimation = this.allowAnimation.bind(this);
    this.takeStep = this.takeStep.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.isArrowKey = this.isArrowKey.bind(this);
  }

  preventAnimation() {
    this.animate = false;
  }

  allowAnimation() {
    this.animate = true;
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
  }

  handleKeydown(event) {
    if (event.repeat) return;
    if (this.isArrowKey(event.which)) {
      event.preventDefault();
      this.keyPressed = event.which;
      if (!this.walking) {
        this.walking = true;
        this.takeStep();
      }
    } else if (event.which === 88) {
      this.run = true;
    }
  }

  isArrowKey(key) {
    return Object.values(keyMap).includes(key);
  }

  handleKeyup(event) {
    if (event.which === this.keyPressed) {
      this.keyPressed = '';
      this.walking = false;
      clearTimeout(this.animationTimer);
    } else if (event.which === 88) {
      this.run = false;
    }
  }

  takeStep() {
    if (!this.keyPressed || !this.walking) return;
    let { direction, step } = this.state;
    var gridPosition = { x: this.props.position.x, y: this.props.position.y };
    const isValid = this.props.isValid;
    this.animate = true;
    if (this.isArrowKey(this.keyPressed)) {
      step = 1;
    }
    switch(this.keyPressed) {
      case keyMap.left:
        direction = 'left';
        if (isValid(gridPosition.y, gridPosition.x-1)) {
          gridPosition.x -= 1;
        }
        break;
      case keyMap.up:
        direction = 'up';
        if (isValid(gridPosition.y-1, gridPosition.x)) {
          gridPosition.y -= 1;
        }
        break;
      case keyMap.right:
        direction = 'right';
        if (isValid(gridPosition.y, gridPosition.x+1)) {
          gridPosition.x += 1;
        }
        break;
      case keyMap.down:
        direction = 'down';
        if (isValid(gridPosition.y+1, gridPosition.x)) {
          gridPosition.y += 1;
        }
        break;
      default:
        break;
    }

    this.props.updatePosition(gridPosition);
    this.setState({ direction: direction, step: step });

    const speed = this.run ? 120 : 240;
    this.animationTimer = setTimeout(() => this.takeStep(), speed);
  }

  componentDidUpdate(prevProps, prevState) {
    const { step, direction } = this.state;
    if (step !== 0) {
      const stepLimit = 8;
      const speed = this.run ? 15 : 30;
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
      <Sprite src={spriteSource} animate={this.animate} speed={this.run ? 12 : 24} x={x} y={y}></Sprite>
    );
  }

}

export default Player;
