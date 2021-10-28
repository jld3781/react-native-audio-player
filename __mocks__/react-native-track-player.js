const mockReactNativeTrackPlayer = {
  pause: jest.fn(),
  play: jest.fn(),
  getPosition: jest.fn(),
  seekTo: jest.fn(),
  reset: jest.fn(),
  add: jest.fn(),
  setupPlayer: jest.fn(),
  updateOptions: jest.fn(),
  useProgress: jest.fn(() => ({
    position: "",
    buffered: "",
    duration: "",
  })),
  useTrackPlayerEvents: jest.fn(),
  Event: {
    PlaybackState: "",
  },
  State: {
    Playing: "playing",
    Paused: "paused",
    Stopped: "stopped",
    Buffering: "buffering",
  },
  Capability: {
    JumpBackward: "jump-backward",
    Play: "play",
    Pause: "pause",
    JumpForward: "jump-forward",
  },
};

module.exports = mockReactNativeTrackPlayer;
