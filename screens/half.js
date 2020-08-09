import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, PanResponder, Animated, Alert } from 'react-native';
import EventListener from 'react-event-listener';

class Draggable extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    const { data } = props;
    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
      data: data
    };
  }

  componentWillMount() {
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);
    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
          this.state.pan.setOffset({
            x: this._val.x,
            y:this._val.y
          })
          this.state.pan.setValue({ x:0, y:0})
        },
        onPanResponderMove: Animated.event([
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e, gesture) => {
          if (this.isDropAreaBlue(gesture)) {
            Animated.timing(this.state.opacity, {
              toValue: 0,
              duration: 1000
            }).start(() =>
              console.log("isDropAreaBlue"),
              this.isSucsess(1),
              this.setState({
                showDraggable: true
              })
            );
          }else if (this.isDropAreaRed(gesture)) {
            Animated.timing(this.state.opacity, {
              toValue: 0,
              duration: 1000
            }).start(() =>
              console.log("isDropAreaRed"),
              this.isSucsess(2),
              this.setState({
                showDraggable: true
              }),
            );
          }
        }
      });
  }

  isDropAreaBlue(gesture) {
    return gesture.moveY < 150 + 76 && gesture.moveX < (window.innerWidth/2);
  }
  isDropAreaRed(gesture) {
    return gesture.moveY < 150 + 76 && gesture.moveX >=  (window.innerWidth/2);
  }
  isSucsess(ans){
    if (this.state.data.ans == ans) {
      // TODO stateのpointを増やす
      this.setState({ point: this.state.point + 1 });
      console.log("YES");
      Alert.alert('YES');
      alert("正解");
    }else{
      console.log("NG");
      Alert.alert('NG');
      alert("不正解");
    }
  }

  render() {
    return (
      <View style={{ width: "20%", alignItems: "center" }}>
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showDraggable) {
      return (
        <View style={{ position: "absolute" }}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, {opacity:this.state.opacity}]}
          >
          <Text style={styles.text}>{this.state.data.text}</Text>
        </Animated.View>
        </View>
      );
    }
  }
}

export default class HalfScreen extends Component {
  state = {
    point : 0
  }

  handleResize = () => {
    console.info(
      `window height:width=${window.innerHeight}:${window.innerWidth}`,
    );
  };

  render() {
    var q = { text: 'Ruby or Rails ?', ans1: 'Ruby', ans2: 'Rails'};
    var data = [
        { id: 1, text: ".to_xml", ans: 1 },
        { id: 2, text: "1.in?([1,2])", ans: 1 },
        { id: 3, text: "Date.today", ans: 2 },
        { id: 4, text: "a.cycle { |x| puts x }", ans: 2 },
        { id: 5, text: "Array.wrap(0)", ans: 1 },
    ];
    return (
      <View style={styles.mainContainer}>
        <View style={styles.ans}><Text style={styles.text}>{q.text}</Text></View>
        <View style={styles.dropZone}>
          <View style={styles.dropZoneBlue}>
            <Text style={styles.text}>{q.ans1}</Text>
          </View>
          <View style={styles.dropZoneRed}>
            <Text style={styles.text}>{q.ans2}</Text>
          </View>
        </View>
        <View style={styles.ballContainer} />
        <View style={styles.row}>
          {data.map( q => { return (<Draggable key={q.id} data={q} />) } )}
        </View>
        <EventListener target="window" onResize={this.handleResize} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  ballContainer: {
    height:200
  },
  circle: {
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "skyblue",
    borderRadius: 5,
    backgroundColor: "skyblue",
    padding: "10px",
    maxWidth: "200px",
  },
  row: {
    flexDirection: "row",
  },
  dropZone: {
    height: 150,
    display: "flex",
    flexDirection: 'row',
  },
  dropZoneBlue: {
    display: "flex",
    backgroundColor: "#00334d",
    width: "50%",
  },
  dropZoneRed: {
    display: "flex",
    backgroundColor: "#FF334d",
    width: "50%",
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  ans: {
    backgroundColor: "#88334d",
  }
});

