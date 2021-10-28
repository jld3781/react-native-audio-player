import React, { useState }  from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import TrackPlayer, { useProgress, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { togglePlayPause, getPlayPauseIconName, jumpToPosition, getProgressWidth, getBufferWidth, getIsPlaying, getIsPaused } from './helpers'
import { MaterialIcons } from '@expo/vector-icons';
import { sharedStyles, toolbarStyles } from './styles'
import { isEmpty } from 'lodash'
import { colors } from './colors'

export const CurrentTrackToolbar = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(null)
    
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            setCurrentTrack(track);
        }
      })

    const CurrentTrackInfo = () => {
      if (isEmpty(currentTrack)) {
        return <View style={sharedStyles.albumImage} />
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
      )
    }

    const ProgressBar = () => {
      const { position, buffered, duration } = useProgress()
  
      const progressWidth = getProgressWidth(position, duration)
      const bufferWidth = getBufferWidth(buffered, duration)
  
      return (
          <View style={toolbarStyles.progressBar}>
            <View style={{ ...toolbarStyles.progressBarBuffer, width: bufferWidth }}>
              <View style={{ ...toolbarStyles.progressBarProgress, width: progressWidth }}>
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
                color={colors.iconColor}
            />
          </TouchableOpacity>
        )
      }

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
      )
    }

    return (
      <View style={toolbarStyles.toolbarContainer}>

        <ProgressBar/>

        <View style={toolbarStyles.toolbarRow}>
          <CurrentTrackInfo />
          <TrackPlayerControls />
        </View>

      </View>
    )
  }