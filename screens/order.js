import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { List, arrayMove } from 'react-movable';

const q = { text: "日本の総理大臣", first: "新", last: "古" }
const ans = [5, 4, 3, 2, 1];
const data = [
  { id: 1, text: "麻生太郎", value: "20080924", },
  { id: 2, text: "鳩山由紀夫", value: "20090916", },
  { id: 3, text: "菅直人", value: "20100608", },
  { id: 4, text: "野田佳彦", value: "20110902", },
  { id: 5, text: "安倍晋三", value: "20121226", },
];

function Order() {
  const [items, setItems] = useState(data);

  const ListStyles = {
    textAlign: "center",
    listStyle: "none",
    margin: "10px",
    padding: "0",
  }

  const firstStyles = {
    textAlign: "center",
    background: '#eaebec',
    borderSpacing: 0,
    color: "#333",
  };

  const lastStyles = {
    textAlign: "center",
    background: '#eaebec',
    borderSpacing: 0,
    color: "#333",
  };

  const ListItemStyles = {
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "skyblue",
    borderRadius: 5,
    backgroundColor: "skyblue",
    margin: "10px",
    padding: "10px",
  }

  React.state = { data: items };

  function setSort(oldIndex, newIndex){
    setItems(arrayMove(items, oldIndex, newIndex));
  }

  return (
    <List
      values={items}
      onChange={({ oldIndex, newIndex }) =>
        setSort(oldIndex, newIndex)
      }
      renderList={({ children, props }) => (
        <div>
        <p style={firstStyles}>{q.first}</p>
        <ul {...props} style={{
          textAlign: "center",
          listStyle: "none",
          margin: "10px",
          padding: "0",
        }}>
          {children}
        </ul>
        <p style={lastStyles}>{q.last}</p>
        </div>
      )}
      renderItem={({ value, props }) => (
        <li {...props} key={props.key} style={{
          ...props.style,
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "skyblue",
          borderRadius: 5,
          backgroundColor: "skyblue",
          textAlign: "center",
          listStyle: "none",
          margin: "10px",
          padding: "10px"
        }}>{value.text}</li>
      )}
    />
  );

}

function CheckOrder(data){
  var x = data.map(item => { return item.id });
  if (array_equal(x, ans)) {
    console.log("正解");
    Alert.alert('正解');
    alert("正解");
  }else{
    console.log("不正解");
    Alert.alert('不正解');
    alert("不正解");
  }
}

function array_equal(a, b) {
  if (!Array.isArray(a))    return false;
  if (!Array.isArray(b))    return false;
  if (a.length != b.length) return false;
  for (var i = 0, n = a.length; i < n; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default class OrderScreen extends Component {

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.title}><Text style={styles.text}>{q.text}</Text></View>
        <Order />
        <View style={styles.button}>
        <Button
          title="決定"
          color="#666"
          onPress={() => {
            CheckOrder(React.state.data);
          }}
        />
        </View>
        <Button
          title="go to Half"
          onPress={() => {
            this.props.navigation.navigate('Half')
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  title: {
    backgroundColor: "#88334d",
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
  button: {
    marginBottom: "15px",
    margin: "auto",
    borderRadius: "15px",
    width: "80%",
  }
});
