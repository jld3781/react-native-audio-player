import TrackPlayer, { State } from 'react-native-track-player';

export const togglePlayPause = async (isPlaying) => {
    if (isPlaying){
      await TrackPlayer.pause()
    } else {
      await TrackPlayer.play()
    }
  }

export const playPauseButtonTitle = (isPlaying) => isPlaying ? "Pause" : "Play"

export const getIsPlaying = (state) => state === State.Playing
  
export const jumpToPosition = async (offset) => {
    const currentPosition =  await TrackPlayer.getPosition();
    const positionWithOffset = currentPosition + offset
    
    const newPosition = positionWithOffset < 0 ? 0 : positionWithOffset

    TrackPlayer.seekTo(newPosition)
  }