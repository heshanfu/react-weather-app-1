import React, { Component, Fragment } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import ForeCast from '../../components/Forecast';
import ForeCastTemperature from '../../components/Forecast/Temperature';
import Location from '../../components/Location';
import Temperature from '../../components/Temperature';
import Navigation from '../../components/Navigation';
import RainProbability from '../../components/RainProbability';
import GPSLocation from '../../components/GPSLocation';
import Info from '../../components/Info';
import DateCurrent from '../../components/DateCurrent';
import Refresh from '../../components/Refresh';
import PropTypes from 'prop-types';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentForecast: 'hourly',
      forecastIndex: ['hourly', 'daily'],
    };
  }

  componentDidMount() {
    this.forecasts = [...document.querySelectorAll('.forecasts__period')];

    this.swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: false
    });

    this.swiper.on('slideChangeTransitionEnd', () => {
      this.setState({ currentForecast: this.state.forecastIndex[this.swiper.activeIndex] });
    });
  }

  render() {
    return <Fragment>
      <GPSLocation onGPSLocationClick={this.props.onGPSLocationClick} />
      <Info onInfoClick={this.props.onInfoClick} onInfoClose={this.props.onInfoClose} />
      <Location location={this.props.currentCondition.location} />
      <DateCurrent date={this.props.currentCondition.date} />
      <Temperature weather={this.props.currentCondition.weather} temperature={this.props.currentCondition.temperature} />
      <Refresh onClick={this.props.onRefreshClick} updating={this.props.updating} time={this.props.lastUpdate} />
      <section className="forecasts">
        <div className="forecasts__scroll-panel swiper-container">
          <div className="swiper-wrapper">
            <section className="forecasts__period swiper-slide">
              {
                this.props.foreCastHourly.map((item, index) => <ForeCast key={`hourly-${index}`} id={`hourly-${index}`} title={`${item.time}:00`} icon={item.icon} animationDelay={index}>
                  <ForeCastTemperature temperature={item.temperature} />
                  <RainProbability probability={item.rainProbability} />
                </ForeCast>)
              }
            </section>

            <section className="forecasts__period forecasts--daily swiper-slide">
              {
                this.props.foreCastDaily.map((item, index) => <ForeCast key={`daily-${index}`} id={`daily-${index}`} title={item.weekDay} icon={item.icon} animationDelay={index}>
                  <div>
                    <ForeCastTemperature temperature={item.temperature.max} />
                    <ForeCastTemperature temperature={item.temperature.min} />
                  </div>
                  <RainProbability probability={item.rainProbability} />
                </ForeCast>)
              }
            </section>
          </div>
        </div>
        <Navigation currentForecast={this.state.currentForecast} />
      </section>
    </Fragment>
  }
}

Home.propTypes = {
  foreCastHourly: PropTypes.array,
  foreCastDaily: PropTypes.array,
  updating: PropTypes.bool,
  lastUpdate: PropTypes.string,
  currentCondition: PropTypes.object,
  onGPSLocationClick: PropTypes.func,
  onInfoClick: PropTypes.func,
  onInfoClose: PropTypes.func,
  onRefreshClick: PropTypes.func
};

export default Home;
