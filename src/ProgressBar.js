import React from "react";
import { View } from "react-native";
import { useProgress } from "react-native-track-player";
import { getProgressWidth, getBufferWidth } from "./helpers";
import { toolbarStyles } from "./styles";

export const ProgressBar = () => {
  const { position, buffered, duration } = useProgress();

  const progressWidth = getProgressWidth(position, duration);
  const bufferWidth = getBufferWidth(buffered, duration);

  return (
    <View style={toolbarStyles.progressBar}>
      <View style={{ ...toolbarStyles.progressBarBuffer, width: bufferWidth }}>
        <View
          style={{
            ...toolbarStyles.progressBarProgress,
            width: progressWidth,
          }}
        ></View>
      </View>
    </View>
  );
};
