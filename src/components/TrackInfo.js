import React from "react";
import { Image, Text, View } from "react-native";
import { trackInfoStyles } from "../styles";
import { isEmpty } from "lodash";

export const TrackInfo = ({ track }) => {
  if (isEmpty(track)) {
    return <View style={trackInfoStyles.albumImage} />;
  }

  return (
    <>
      <Image
        source={{ uri: track.artwork }}
        style={trackInfoStyles.albumImage}
      />

      <View style={trackInfoStyles.trackDetailsContainer}>
        <Text style={trackInfoStyles.trackTitle}>{track.title}</Text>
        <Text>{track.artist}</Text>
      </View>
    </>
  );
};
