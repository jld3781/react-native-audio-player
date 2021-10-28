import {
  togglePlayPause,
  getPlayPauseIconName,
  getIsPlaying,
  getIsPaused,
  getProgressWidth,
  getBufferWidth,
  setupTrackPlayer,
  jumpToPosition,
  startTrack,
} from "../src/helpers";
import TrackPlayer, { State, Capability } from "react-native-track-player";

describe("getPlayPauseIconName", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show the pause button when audio is playing", () => {
    const isPlaying = true;

    const result = getPlayPauseIconName(isPlaying);

    expect(result).toBe("pause");
  });

  it("should show the pause button when audio is playing", () => {
    const isPlaying = false;

    const result = getPlayPauseIconName(isPlaying);

    expect(result).toBe("play-arrow");
  });
});

describe("togglePlayPause", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should pause the audio when the audio is playing", async () => {
    const isPlaying = true;

    togglePlayPause(isPlaying);

    await expect(TrackPlayer.pause).toHaveBeenCalled();
  });

  it("should play the audio when the audio is not playing", async () => {
    const isPlaying = false;

    togglePlayPause(isPlaying);

    await expect(TrackPlayer.play).toHaveBeenCalled();
  });
});

describe("jumpToPosition", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should progress the audio back 30 seconds when the previous button is pressed", async () => {
    const startPosition = 60;
    const offset = -30;
    const expectedEndPosition = 30;
    TrackPlayer.getPosition.mockResolvedValue(startPosition);

    await jumpToPosition(offset);

    expect(TrackPlayer.seekTo).toHaveBeenCalledWith(expectedEndPosition);
  });

  it("should progress the audio forward 30 seconds when the next button is pressed", async () => {
    const startPosition = 60;
    const offset = 30;
    const expectedEndPosition = 90;
    TrackPlayer.getPosition.mockResolvedValue(startPosition);

    await jumpToPosition(offset);

    expect(TrackPlayer.seekTo).toHaveBeenCalledWith(expectedEndPosition);
  });

  it("should start the audio at the beginning when the previous button is pressed and 30 seconds or less have elapsed", async () => {
    const startPosition = 15;
    const offset = -30;
    const expectedEndPosition = 0;
    TrackPlayer.getPosition.mockResolvedValue(startPosition);

    await jumpToPosition(offset);

    expect(TrackPlayer.seekTo).toHaveBeenCalledWith(expectedEndPosition);
  });
});

describe("getIsPlaying", () => {
  it("should return true when the audio is playing", () => {
    const state = State.Playing;

    const result = getIsPlaying(state);

    expect(result).toBe(true);
  });

  it("should return false when the audio is paused", () => {
    const state = State.Paused;

    const result = getIsPlaying(state);

    expect(result).toBe(false);
  });
});

describe("getIsPaused", () => {
  it("should return true when the audio is paused", () => {
    const state = State.Paused;

    const result = getIsPaused(state);

    expect(result).toBe(true);
  });

  it("should return false when the audio is playing", () => {
    const state = State.Playing;

    const result = getIsPaused(state);

    expect(result).toBe(false);
  });
});

describe("getProgressWidth", () => {
  it("should return '0%' when the track hasn't started yet", () => {
    const position = 0;
    const duration = 700;

    const result = getProgressWidth(position, duration);

    expect(result).toBe("0%");
  });

  it("should return 0 when the duration is less than or equal to zero", () => {
    const position = 0;
    const duration = 0;

    const result = getProgressWidth(position, duration);

    expect(result).toBe(0);
  });

  it("should return 0 when the duration is invalid", () => {
    const position = 0;
    const duration = undefined;

    const result = getProgressWidth(position, duration);

    expect(result).toBe(0);
  });
});

describe("getBufferWidth", () => {
  it("should return '0%' when buffering hasn't started yet", () => {
    const buffered = 0;
    const duration = 700;

    const result = getBufferWidth(buffered, duration);

    expect(result).toBe("0%");
  });

  it("should return 0 when the duration is less than or equal to zero", () => {
    const buffered = 0;
    const duration = 0;

    const result = getBufferWidth(buffered, duration);

    expect(result).toBe(0);
  });

  it("should return 0 when the duration is invalid", () => {
    const buffered = 0;
    const duration = undefined;

    const result = getBufferWidth(buffered, duration);

    expect(result).toBe(0);
  });
});

describe("setupTrackPlayer", () => {
  it("should setup the player with the appropriate options for remote play", async () => {
    const tracks = [
      {
        id: "some uuid",
      },
    ];
    const options = {
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
    };

    setupTrackPlayer(tracks);

    await expect(TrackPlayer.setupPlayer).toHaveBeenCalledWith({});
    await expect(TrackPlayer.updateOptions).toHaveBeenCalledWith(options);
    await expect(TrackPlayer.add).toHaveBeenCalledWith(tracks[0]);
  });
});

describe("startTrack", () => {
  it("should stop the previous track, add the new track, and start playing", async () => {
    const track = {};

    startTrack(track);

    // had to call '.reset()' and '.add()' here instead of '.stop()' because of an issue in the track player package for iOS where '.stop()' clears all tracks from the track player queue
    await expect(TrackPlayer.reset).toHaveBeenCalled();
    await expect(TrackPlayer.add).toHaveBeenCalledWith(track);
    await expect(TrackPlayer.play).toHaveBeenCalled();
  });
});
