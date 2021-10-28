import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTrackPlayerEvents, Event } from "react-native-track-player";
import {
  togglePlayPause,
  getPlayPauseIconName,
  jumpToPosition,
  getIsPlaying,
  getIsPaused,
} from "./helpers";
import { MaterialIcons } from "@expo/vector-icons";
import { toolbarStyles } from "./styles";
import { colors } from "./colors";

export const TrackPlayerControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const SEEK_OFFSET = 30;

  const PlayPauseControl = () => {
    useTrackPlayerEvents([Event.PlaybackState], async (event) => {
      if (getIsPlaying(event.state)) {
        setIsPlaying(true);
      }

      if (getIsPaused(event.state)) {
        setIsPlaying(false);
      }
    });

    return (
      <TouchableOpacity onPress={() => togglePlayPause(isPlaying)}>
        <MaterialIcons
          name={getPlayPauseIconName(isPlaying)}
          size={40}
          color={colors.iconColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={toolbarStyles.trackPlayerControlsContainer}>
        <View style={toolbarStyles.trackPlayerControlsRow}>
          <TouchableOpacity onPress={() => jumpToPosition(-SEEK_OFFSET)}>
            <MaterialIcons
              name="replay-30"
              size={24}
              color={colors.iconColor}
            />
          </TouchableOpacity>

          <PlayPauseControl />

          <TouchableOpacity onPress={() => jumpToPosition(SEEK_OFFSET)}>
            <MaterialIcons
              name="forward-30"
              size={24}
              color={colors.iconColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
