import { togglePlayPause, playPauseButtonTitle, getIsPlaying, jumpToPosition } from '../src/helpers'
import TrackPlayer, { State } from 'react-native-track-player';

describe('playPauseButtonTitle', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should show the pause button when audio is playing', () => {
        const isPlaying = true

        const result = playPauseButtonTitle(isPlaying)

        expect(result).toBe("Pause")
    })
    
    it('should show the pause button when audio is playing', () => {
        const isPlaying = false

        const result = playPauseButtonTitle(isPlaying)

        expect(result).toBe("Play")
    })
})

describe('togglePlayPause', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should pause the audio when the audio is playing', async () => {
        const isPlaying = true
        
        togglePlayPause(isPlaying)

        await expect(TrackPlayer.pause).toHaveBeenCalled()
    })
    
    it('should play the audio when the audio is not playing', async () => {
        const isPlaying = false

        togglePlayPause(isPlaying)

        await expect(TrackPlayer.play).toHaveBeenCalled()
    })
})

describe('jumpToPosition', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should progress the audio back 30 seconds when the previous button is pressed', async () => {
        const startPosition = 60
        const offset = -30
        const expectedEndPosition = 30
        TrackPlayer.getPosition.mockResolvedValue(startPosition)

        await jumpToPosition(offset)

        expect(TrackPlayer.seekTo).toHaveBeenCalledWith(expectedEndPosition)
    })
    
    it('should progress the audio forward 30 seconds when the next button is pressed', async () => {
        const startPosition = 60
        const offset = 30
        const expectedEndPosition = 90
        TrackPlayer.getPosition.mockResolvedValue(startPosition)

        await jumpToPosition(offset)

        expect(TrackPlayer.seekTo).toHaveBeenCalledWith(expectedEndPosition)
    })

    it('should start the audio at the beginning when the previous button is pressed and 30 seconds or less have elapsed', async () => {
        const startPosition = 15
        const offset = -30
        const expectedEndPosition = 0
        TrackPlayer.getPosition.mockResolvedValue(startPosition)

        await jumpToPosition(offset)

        expect(TrackPlayer.seekTo).toHaveBeenCalledWith(expectedEndPosition)
    })
})

describe('getIsPlaying', () => {

    it('should return true when the audio is playing', () => {
        const state = State.Playing

        const result = getIsPlaying(state)

        expect(result).toBe(true)
    })

    it('should return true when the audio is buffering', () => {
        const state = State.Buffering

        const result = getIsPlaying(state)

        expect(result).toBe(true)
    })

    it('should return false when the audio is paused', () => {
        const state = State.Paused

        const result = getIsPlaying(state)

        expect(result).toBe(false)
    })

    it('should return false when the audio is stopped', () => {
        const state = State.Stopped

        const result = getIsPlaying(state)

        expect(result).toBe(false)
    })
})
