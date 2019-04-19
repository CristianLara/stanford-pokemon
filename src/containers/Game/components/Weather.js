import React from 'react';
import Styled from 'styled-components';
import moment from 'moment';

const Overlay = Styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index:100;
  background-color: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
  transition-duration: 3s;
`;

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = { color: '', opacity: 0, currentHour: 12 };
    this.checkTimeOfDay = this.checkTimeOfDay.bind(this);
  }

  isNightTime(hour) {
    return hour < 6 || hour > 20;
  }

  isDawnOrDusk(hour) {
    return (hour >= 6 && hour < 8) || (hour >= 19 && hour < 21);
  }

  isDayTime(hour) {
    return hour >= 8 && hour < 19;
  }

  componentDidMount() {
    this.checkTimeOfDay();
  }

  componentDidUpdate() {
    if (this.state.currentHour !== moment().hour()) {
      this.checkTimeOfDay();
    }
  }

  checkTimeOfDay() {
    let color = '';
    let opacity = 0;
    const currentHour = moment().hour();
    if (this.isNightTime(currentHour)) {
      color = 'navy';
      opacity = 0.4;
    } else if (this.isDawnOrDusk(currentHour)) {
      color = 'orangered';
      opacity = 0.15;
    } else if (this.isDayTime(currentHour)) {
      color = 'transparent';
      opacity = 0;
    } else {
      // wtf time of day is it?
      color = 'transparent';
      opacity = 0;
    }
    this.setState({ color, opacity, currentHour });
  }

  render() {
    const { color, opacity } = this.state;
    return (
      <Overlay color={color} opacity={opacity} />
    )
  }

}

export default Weather;
