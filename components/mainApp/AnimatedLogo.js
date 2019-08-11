import React from 'react';
import {Animated} from 'react-native';

class AnimatedLogo extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
      }

      componentDidMount() {
        Animated.timing(                  // Animate over time
          this.state.fadeAnim,            // The animated value to drive
          {
            toValue: 1,                   // Animate to opacity: 1 (opaque)
            duration: this.props.duration,              // Make it take a while
          }
        ).start();                        // Starts the animation
      }

    render() {
        return (
            <Animated.View                 // Special animatable View
            style={{
              opacity: this.state.fadeAnim,         // Bind opacity to animated value
            }}
          >
            {this.props.children}
          </Animated.View>
        );
    }
}

export default AnimatedLogo;