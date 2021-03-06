import TrackPlayer, { Capability, State } from "react-native-track-player";
import { isNil, first } from "lodash";

export const togglePlayPause = async (isPlaying) => {
  if (isPlaying) {
    await TrackPlayer.pause();
  } else {
    await TrackPlayer.play();
  }
};

export const getPlayPauseIconName = (isPlaying) =>
  isPlaying ? "pause" : "play-arrow";

export const getIsPlaying = (state) => state === State.Playing;

export const getIsPaused = (state) => state === State.Paused;

export const getProgressWidth = (position, duration) => {
  if (isNil(duration) || duration <= 0) return 0;

  return (position / duration) * 100 + "%";
};

export const getBufferWidth = (buffered, duration) => {
  if (isNil(duration) || duration <= 0) return 0;

  return (buffered / duration) * 100 + "%";
};

export const setupTrackPlayer = async (tracks) => {
  await TrackPlayer.setupPlayer({});
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
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  const firstTrack = first(tracks);
  await TrackPlayer.add(firstTrack);
};

export const startTrack = async (track) => {
  await TrackPlayer.reset();
  await TrackPlayer.add(track);
  await TrackPlayer.play();
};

export const jumpToPosition = async (offset) => {
  const currentPosition = await TrackPlayer.getPosition();
  const positionWithOffset = currentPosition + offset;

  const newPosition = positionWithOffset < 0 ? 0 : positionWithOffset;

  TrackPlayer.seekTo(newPosition);
};
