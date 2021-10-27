import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View, SafeAreaView, FlatList, TouchableHighlight, Platform } from 'react-native';
import TrackPlayer, { Capability, useProgress, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { togglePlayPause, playPauseButtonTitle, getIsPlaying, jumpToPosition } from './helpers'
import { tracks } from './tracks'

export default function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null)
  
  async function setupTrackPlayer() {
    await TrackPlayer.setupPlayer({})
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play, 
        Capability.Pause
      ],
    });
    const firstTrackId = 0
    const firstTrack = tracks.find(track => track.id === firstTrackId)
    await TrackPlayer.add(firstTrack)
  }

  useEffect(() => {
    setupTrackPlayer()
  }, [])

  const PlayPauseControl = () => {
    useTrackPlayerEvents([Event.PlaybackState], async event => {
        setIsPlaying(getIsPlaying(event.state))
    });

    return (
      <Button title={playPauseButtonTitle(isPlaying)} 
              onPress={ () => togglePlayPause(isPlaying) }
      />
    )
  }

  const TrackPlayerControls = () => {
    const SEEK_OFFSET = 30
    const { position } = useProgress()

    return (
      <>
        <View style={styles.trackPlayerControlsContainer}>

          {/* <Text>Pos: {position}</Text> */}

          <View style={styles.trackPlayerControlsRow}>
            <Button title="Prev" onPress={ () => jumpToPosition(-SEEK_OFFSET) }/>
            <PlayPauseControl />
            <Button title="Next" onPress={ () => jumpToPosition(SEEK_OFFSET) }/>
          </View>
        </View>
        
      </>
    )
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        setCurrentTrack(track);
    }
  })
  const startTrack = async (index) => {
    await TrackPlayer.reset()
    const nextTrack = tracks.find(track => track.id === index)
    await TrackPlayer.add(nextTrack)
    await TrackPlayer.play()
  }

  const renderTrack = ({ item }) => {
      return (
        <TouchableHighlight 
          activeOpacity={0.9}
          underlayColor="#DDDDDD" 
          onPress={ () => startTrack(item.id)}
        >
        
          <View 
            key={item.id} 
            style={styles.trackListItemRow}
          >
            
              <Image 
                source={{ uri: item.artwork ?? "" }} 
                style={styles.albumImage} 
              />

              <View style={styles.trackDetailsContainer}>
                <Text style={styles.trackTitle}>{ item.title ?? "" }</Text>
                <Text>{ item.artist ?? "" }</Text>
              </View>
              
          </View>

        </TouchableHighlight>
      )  
  }


  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.footerRow}>

          <Image 
            source={{ uri: currentTrack ? currentTrack.artwork : "" }} 
            style={styles.albumImage} 
          />

          <View style={styles.trackDetailsContainer}>
            <Text style={styles.trackTitle}>{ currentTrack ? currentTrack.title : "" }</Text>
            <Text>{ currentTrack ? currentTrack.artist : ""  }</Text>
          </View>

          <TrackPlayerControls />

        </View>
      </View>
    )
  }

  return (
    <SafeAreaView>
        <StatusBar style="auto" />

        <FlatList
          data={tracks}
          renderItem={renderTrack}
          keyExtractor={item => item.id}
          style={styles.trackList}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          ListFooterComponent={() => <View style={styles.footerOffset} /> }
        />

        <Footer /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footerOffset: {
    height: 80
  },
  trackList: {
    paddingTop: 10
  },
  listSeparator: {
    backgroundColor: "#DDDDDD", 
    height: 1
  },
  trackListItemRow: {
    flexDirection: "row", 
    paddingHorizontal: 16, 
    paddingVertical: 5
  },
  footerContainer: {
    position: "absolute", 
    flexDirection: "row", 
    bottom: 0, 
    paddingTop: 15, 
    flex: 1, 
    paddingHorizontal: 16, 
    backgroundColor: "#DDDDDD", 
    opacity: 0.95, 
    zIndex:1000,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20, 
  },
  footerRow: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between",
    opacity: 1,
  },
  trackDetailsContainer: {
    flex: 1, 
    flexDirection: "column", 
    paddingHorizontal: 10, 
    justifyContent: "space-evenly"
  },
  trackTitle: {
    fontWeight: "bold"
  },
  albumImage: {
    width: 50,
    height: 50,
    borderRadius: 3,
    alignSelf: 'center'
  },
  trackPlayerControlsContainer: {
    flexDirection: "column", 
    flex: 1,
  },
  trackPlayerControlsRow: {
    flexDirection: "row",
  }
});
