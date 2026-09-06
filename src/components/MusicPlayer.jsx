import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const hasStartedRef = useRef(false)
  const wasPlayingBeforeHidden = useRef(false)

  const playAudio = () => {
    if (!audioRef.current) return
    const promise = audioRef.current.play()
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true)
          hasStartedRef.current = true
        })
        .catch(() => {
          // Autoplay policy prevented playback; will retry on next user tap
        })
    }
  }

  useEffect(() => {
    // Play on the very first user interaction anywhere on the screen
    const handleFirstTap = () => {
      if (!hasStartedRef.current) {
        playAudio()
      }
    }

    const interactionEvents = ['pointerdown', 'touchstart', 'click', 'keydown']
    interactionEvents.forEach((event) => {
      window.addEventListener(event, handleFirstTap, { passive: true })
    })

    // Handle backgrounding/tab switching
    const handleVisibilityChange = () => {
      if (!audioRef.current) return
      if (document.hidden) {
        if (isPlaying) {
          wasPlayingBeforeHidden.current = true
          audioRef.current.pause()
          setIsPlaying(false)
        }
      } else if (wasPlayingBeforeHidden.current) {
        wasPlayingBeforeHidden.current = false
        playAudio()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleFirstTap)
      })
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isPlaying])

  const toggleMusic = (e) => {
    e.stopPropagation()
    if (!audioRef.current) return
    hasStartedRef.current = true

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      wasPlayingBeforeHidden.current = false
    } else {
      playAudio()
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/audio/bgm.mp3"
        loop
        preload="auto"
        playsInline
      />
      <button
        type="button"
        className={`music-toggle ${isPlaying ? 'is-playing' : 'is-paused'}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        <div className="music-toggle-inner">
          {isPlaying ? (
            <div className="music-wave" aria-hidden="true">
              <span className="music-bar music-bar-1" />
              <span className="music-bar music-bar-2" />
              <span className="music-bar music-bar-3" />
              <span className="music-bar music-bar-4" />
            </div>
          ) : (
            <svg
              className="music-muted-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="1" y1="1" x2="22" y2="22" />
              <path d="M18.8 4A12 12 0 0 1 20 8M15.5 8.5a7 7 0 0 1 1.5 3.5M11 5L6 9H2v6h4l5 4V5z" />
            </svg>
          )}
        </div>
      </button>
    </>
  )
}
