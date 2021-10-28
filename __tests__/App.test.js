import "react-native";
import React from "react";
import App from "../src/App";

jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    MaterialIcons: View,
  };
});

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", () => {
  renderer.create(<App />);
});
