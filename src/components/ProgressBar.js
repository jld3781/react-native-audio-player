import React from "react";
import { View } from "react-native";
import { useProgress } from "react-native-track-player";
import { getProgressWidth, getBufferWidth } from "../helpers";
import { progressBarStyles } from "../styles";

export const ProgressBar = () => {
  const { position, buffered, duration } = useProgress();

  const progressWidth = getProgressWidth(position, duration);
  const bufferWidth = getBufferWidth(buffered, duration);

  return (
    <View style={progressBarStyles.progressBar}>
      <View
        style={{ ...progressBarStyles.progressBarBuffer, width: bufferWidth }}
      >
        <View
          style={{
            ...progressBarStyles.progressBarProgress,
            width: progressWidth,
          }}
        ></View>
      </View>
    </View>
  );
};
