import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

function SearchInput({ placeholder, onSubmit }) {
  const [text, setText] = useState("");

  const handleChangeText = (text) => {
    setText(text);
  };

  const handleSubmitEditing = () => {
    if (!text) return;

    onSubmit(text);
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        autoCorrect={false}
        value={text}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        clearButtonMode="always"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  );
}

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: "#333333",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    color: "white",
  },
});
