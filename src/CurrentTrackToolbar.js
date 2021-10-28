import React from "react";
import { View } from "react-native";
import { toolbarStyles } from "./styles";
import { ProgressBar } from "./ProgressBar";
import { TrackPlayerControls } from "./TrackPlayerControls";
import { CurrentTrackInfo } from "./CurrentTrackInfo";

export const CurrentTrackToolbar = () => {
  return (
    <View style={toolbarStyles.toolbarContainer}>
      <ProgressBar />

      <View style={toolbarStyles.toolbarRow}>
        <CurrentTrackInfo />
        <TrackPlayerControls />
      </View>
    </View>
  );
};
