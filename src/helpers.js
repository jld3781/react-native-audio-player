import TrackPlayer, { Capability, State } from "react-native-track-player";

export const togglePlayPause = async (isPlaying) => {
  if (isPlaying) {
    await TrackPlayer.pause();
  } else {
    await TrackPlayer.play();
  }
};

export const getPlayPauseIconName = (isPlaying) =>
  isPlaying ? "pause" : "play-arrow";

export const getIsPlaying = (state) => {
  if (state === State.Playing) return true;
};

export const getIsPaused = (state) => {
  if (state === State.Paused) return true;
};

export const getProgressWidth = (position, duration) => {
  if (duration <= 0) return 0;

  return (position / duration) * 100 + "%";
};

export const getBufferWidth = (buffered, duration) => {
  if (duration <= 0) return 0;

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

  const firstTrackId = "0";
  const firstTrack = tracks.find((track) => track.id === firstTrackId);
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
