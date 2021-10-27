import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, FlatList, TouchableHighlight, TouchableOpacity, Platform } from 'react-native';
import TrackPlayer, { Capability, useProgress, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { togglePlayPause, playPauseIconName, getIsPlaying, jumpToPosition } from './helpers'
import { tracks } from './tracks'
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null)
  
  async function setupTrackPlayer() {
    await TrackPlayer.setupPlayer({})
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      forwardJumpInterval: 30,
      backwardJumpInterval: -30,
      capabilities: [
        Capability.JumpBackward,
        Capability.Play,
        Capability.Pause,
        Capability.JumpForward,
      ],
      compactCapabilities: [
        Capability.Play, 
        Capability.Pause
      ],
    });
    const firstTrackId = "0"
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
      <TouchableOpacity onPress={() => togglePlayPause(isPlaying)}>
        <MaterialIcons 
        name={playPauseIconName(isPlaying)} 
        size={40} 
        color="black" 
        />
      </TouchableOpacity>

    )
  }

  const TrackPlayerControls = () => {
    const SEEK_OFFSET = 30

    return (
      <>
        <View style={styles.trackPlayerControlsContainer}>

          <View style={styles.trackPlayerControlsRow}>
            <TouchableOpacity onPress={() => jumpToPosition(-SEEK_OFFSET)}>
              <MaterialIcons 
              name="replay-30" 
              size={24} 
              color="black" 
              />
            </TouchableOpacity>
            
            <PlayPauseControl /> 

            <TouchableOpacity onPress={() => jumpToPosition(SEEK_OFFSET)}>
              <MaterialIcons 
              name="forward-30" 
              size={24} 
              color="black" 
              />
            </TouchableOpacity>
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
  const ProgressBar = () => {
    const { position, buffered, duration } = useProgress()

    let progressWidth = (position / duration * 100) + '%'
    let bufferWidth = (buffered / duration * 100) + '%'

    return (
        <View style={styles.progressBar}>
          <View style={{...styles.progressBarBuffer, width: bufferWidth}}>
            <View style={{...styles.progressBarProgress, width: progressWidth}}>
            </View>
          </View>
        </View>
    )
  }

  const Footer = () => {
    return (
      <View style={styles.footerContainer}>

        <ProgressBar/>

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
  progressBarProgress: {
    backgroundColor: '#000',
    height: 4,
    borderRadius: 5,
  },
  progressBarBuffer: {
    backgroundColor: '#aaa',
    height: 4,
    borderRadius: 5,
  },
  progressBar: {
    height: 4,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginBottom: 15,
  },
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
    flexDirection: "column", 
    bottom: 0, 
    right:0,
    left:0,
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
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
