import React, { useState } from "react";
import { View } from "react-native";
import { toolbarStyles } from "../styles";
import { ProgressBar } from "./ProgressBar";
import { TrackPlayerControls } from "./TrackPlayerControls";
import { TrackInfo } from "./TrackInfo";
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from "react-native-track-player";

export const CurrentTrackToolbar = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentTrack(track);
    }
  });

  return (
    <View style={toolbarStyles.toolbarContainer}>
      <ProgressBar />

      <View style={toolbarStyles.toolbarRow}>
        <TrackInfo track={currentTrack} />
        <TrackPlayerControls />
      </View>
    </View>
  );
};
