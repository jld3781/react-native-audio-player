const mockReactNativeTrackPlayer = {
    pause: jest.fn(),
    play: jest.fn(),
    getPosition: jest.fn(),
    seekTo: jest.fn(),
    useProgress: jest.fn(() => ({ 
        position: "", 
    })),
    useTrackPlayerEvents: jest.fn(), 
    Event: {
        PlaybackState: "",
    },
    State: {
        Playing: "playing",
        Paused: "paused",
        Stopped: "stopped",
        Buffering: "buffering"
    }
}

module.exports = mockReactNativeTrackPlayer