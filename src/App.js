import React, { useEffect } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
} from "react-native";
import TrackPlayer from "react-native-track-player";
import { setupTrackPlayer, startTrack } from "./helpers";
import { tracks } from "./tracks";
import { trackListStyles } from "./styles";
import { CurrentTrackToolbar } from "./components/CurrentTrackToolbar";
import { isEmpty } from "lodash";
import { colors } from "./colors";
import { TrackInfo } from "./components/TrackInfo";

export default function App() {
  useEffect(() => {
    setupTrackPlayer(tracks);
    return () => TrackPlayer.destroy();
  }, []);

  const renderTrack = ({ item }) => {
    if (isEmpty(item)) return null;

    return (
      <TouchableHighlight
        activeOpacity={0.9}
        underlayColor={colors.rowHighlight}
        onPress={() => startTrack(item)}
      >
        <View key={item.id} style={trackListStyles.trackListItemRow}>
          <TrackInfo track={item} />
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.statusBar} barStyle="default" />
      <FlatList
        data={tracks}
        renderItem={renderTrack}
        keyExtractor={(item) => item.id}
        style={trackListStyles.trackList}
        ItemSeparatorComponent={() => (
          <View style={trackListStyles.listSeparator} />
        )}
        ListFooterComponent={() => (
          <View style={trackListStyles.footerOffset} />
        )}
      />
      <CurrentTrackToolbar />
    </SafeAreaView>
  );
}
