import { React, useState, useRef } from 'react'
import "./VedioPlayer.css"

export default function VedioPlayer() {
  const vedioRef = useRef(null)
  const [Vedio, setVedio] = useState(null)
  const [title, settitle] = useState("Choose New Vedio to Play")

  const handleDoubleClick = (e) => {
    e.preventDefault();
    const video = vedioRef.current;
    const videoDuration = video.duration;
    const seekAmount = 10; // Adjust as needed (in seconds)

    // Calculate the target seek time based on the current playback time
    const currentTime = video.currentTime;
    let targetTime;

    if (e.clientX < window.innerWidth / 2) {
      targetTime = currentTime - seekAmount;
    } else {
      targetTime = currentTime + seekAmount;
    }

    // Ensure the target time is within the valid seekable range
    targetTime = Math.max(0, Math.min(targetTime, videoDuration));

    // Seek to the target time
    video.currentTime = targetTime;
  }

  const handlePlayPause = (e) => {
    e.preventDefault();
    const video = vedioRef.current;

    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }

  return (
    <div className='player'>
      <h3>Vedio Player</h3>
      <div className='content'>
        <h4 className="edit-profile-title vedioHead">{title}</h4>
        {Vedio && (
          <>
            <h6>{Vedio.name}</h6>
            <div>
              <video
                ref={vedioRef}
                alt="Selected File"
                width="600"
                height="320"
                autoPlay
                onClick={handlePlayPause}
                onDoubleClick={(e) => handleDoubleClick(e)}
                preload="metadata">
                <source src={URL.createObjectURL(Vedio)} />
              </video>
            </div>
            <button
              type="button"
              className="edit-profile-btn discard-btn"
              onClick={(e) => {
                setVedio(null)
                settitle("Choose New Vedio to Play")
              }}
            >
              Discard Vedio
            </button>
            <br />
            <span>Note: Vedio has dynamic controlls i.e. Double tap to go forward/backward and single tap to pause/play</span>
          </>
        )}

        {!Vedio && (
          <>
            <label for="vedio" className='discard-btn'>Choose a file</label>
            <input
              type="file"
              id="vedio"
              accept="vedio/*"
              onChange={e => {
                setVedio(e.target.files[0])
                settitle("Displaying Vedio....")
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
