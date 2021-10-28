import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { sharedStyles } from "../styles";
import { isEmpty } from "lodash";
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from "react-native-track-player";

export const CurrentTrackInfo = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentTrack(track);
    }
  });

  if (isEmpty(currentTrack)) {
    return <View style={sharedStyles.albumImage} />;
  }

  return (
    <>
      <Image
        source={{ uri: currentTrack.artwork }}
        style={sharedStyles.albumImage}
      />

      <View style={sharedStyles.trackDetailsContainer}>
        <Text style={sharedStyles.trackTitle}>{currentTrack.title}</Text>
        <Text>{currentTrack.artist}</Text>
      </View>
    </>
  );
};
