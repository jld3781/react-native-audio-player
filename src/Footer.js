import React, { useState }  from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import TrackPlayer, { useProgress, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { togglePlayPause, getPlayPauseIconName, jumpToPosition, getProgressWidth, getBufferWidth, getIsPlaying, getIsPaused } from './helpers'
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles'

export const Footer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(null)
    
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            setCurrentTrack(track);
        }
      })

    const CurrentTrackInfo = () => {
      if (currentTrack === null || currentTrack === undefined || currentTrack === {}) {
        return <View style={styles.albumImage} />
      }

      return (
        <>
        <Image 
            source={{ uri: currentTrack.artwork }} 
            style={styles.albumImage} 
          />

          <View style={styles.trackDetailsContainer}>
            <Text style={styles.trackTitle}>{ currentTrack.title }</Text>
            <Text>{ currentTrack.artist }</Text>
          </View>
        </>
      )
    }

    const ProgressBar = () => {
      const { position, buffered, duration } = useProgress()
  
      let progressWidth = getProgressWidth(position, duration)
      let bufferWidth = getBufferWidth(buffered, duration)
  
      return (
          <View style={styles.progressBar}>
            <View style={{...styles.progressBarBuffer, width: bufferWidth}}>
              <View style={{...styles.progressBarProgress, width: progressWidth}}>
              </View>
            </View>
          </View>
      )
    }

    const TrackPlayerControls = () => {
      const SEEK_OFFSET = 30

      const PlayPauseControl = () => {
        useTrackPlayerEvents([Event.PlaybackState], async event => {
          if (getIsPlaying(event.state)){
            setIsPlaying(true)
          } 
    
          if (getIsPaused(event.state)) {
            setIsPlaying(false)
          }
        });
    
        return (
          <TouchableOpacity onPress={() => togglePlayPause(isPlaying)}>
            <MaterialIcons 
            name={getPlayPauseIconName(isPlaying)} 
            size={40} 
            color="black" 
            />
          </TouchableOpacity>
    
        )
      }

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

    return (
      <View style={styles.footerContainer}>

        <ProgressBar/>

        <View style={styles.footerRow}>
          <CurrentTrackInfo />
          <TrackPlayerControls />
        </View>

      </View>
    )
  }