// flow

import React, { PropTypes, Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';

const SCRREN_WIDTH = Dimensions.get('window').width;
const SCRREN_HEIGHT = Dimensions.get('window').height;

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showOverlay !== nextProps.showOverlay) {
      if (nextProps.showOverlay) {
        Animated.timing(this.state.opacity, {
          toValue: nextProps.opacity || 0,
          duration: this.props.animationDuration,
        }).start();
      } else {
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: this.props.animationDuration,
        }).start();
      }
    }
  }

  render() {
    const backgroundColor = { backgroundColor: this.props.backgroundColor };
    const pointerEvents = this.props.showOverlay ? 'auto' : 'none';
    const onPress = this.props.onPress;
    const opacity = { opacity: this.state.opacity };

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={[styles.overlay, backgroundColor, opacity]}
      >
        <TouchableOpacity onPress={onPress} style={[styles.overlay]} />
      </Animated.View>
    );
  }
}


Overlay.propTypes = {
  onPress: PropTypes.func,
  backgroundColor: PropTypes.string,
  opacity: PropTypes.number,
  animationDuration: PropTypes.number,
  showOverlay: PropTypes.bool,
};

Overlay.defaultProps = {
  backgroundColor: '#000',
  opacity: 0.5,
  animationDuration: 200,
  showOverlay: false,
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCRREN_WIDTH,
    height: SCRREN_HEIGHT,
    position: 'absolute',
  },
});

export default Overlay;
