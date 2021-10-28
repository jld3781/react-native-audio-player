import TrackPlayer, { Event } from "react-native-track-player";
import { jumpToPosition } from "./helpers";

module.exports = async function setup() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, ({ interval }) => {
    jumpToPosition(interval);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, ({ interval }) => {
    jumpToPosition(interval);
  });
};
