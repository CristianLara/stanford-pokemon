import React from 'react';
import Styled from 'styled-components';
import '../../../Fonts/fonts.css';

const Bar = Styled.div`
  position: fixed;
  top: ${(props) => props.y}px;
  left: 12px;
  z-index:999;
  transition: all 2s;
`;

const Title = Styled.h2`
  position: absolute;
  font-family: power_clearregular;
  width: 100%;
  text-align: middle;
`;

class LocationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: require(`../../../graphics/misc/location/${props.type}.png`),
      y: -100,
    }

    this.show = this.show.bind(this);
  }

  componentDidMount() {
    this.show();
  }

  show() {
    this.timer = setTimeout(() => {
      this.setState({y: 10},
        () => this.timer = setTimeout(() => {
          this.setState({ y: -100 });
      }, 4000));
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    // const {  } = this.state;
    // if (step !== 0) {
      // setTimeout(() => {
      //     this.setState({ step: (step + 1) % 9 });
      // }, 40);
    // }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { src, y } = this.state;
    return (
      <Bar y={y}>
        <Title>{this.props.location}</Title>
        <img src={src} alt=''/>
      </Bar>
    )
  }

}

export default LocationBar;
