import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import TrackPlayer, { useProgress, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { togglePlayPause, playPauseButtonTitle, getIsPlaying, jumpToPosition } from './helpers'
import { tracks } from './tracks'

export default function App() {
  
  useEffect(() => {
    async function setupTrackPlayer() {
      await TrackPlayer.setupPlayer({})
      await TrackPlayer.add(tracks)
    }
    setupTrackPlayer()
  }, [])


  const PlayPauseControl = () => {
    const [isPlaying, setIsPlaying] = useState(false);

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
        <Text>Current Position: {position}</Text>

        <Button title="Prev" onPress={ () => jumpToPosition(-SEEK_OFFSET) }/>
        <PlayPauseControl />
        <Button title="Next" onPress={ () => jumpToPosition(SEEK_OFFSET) }/>
      </>
    )
  }
  

  return (
    <View style={styles.container}>

      <TrackPlayerControls />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
