import "./RecordPlayer.scss";
import { useState, useEffect } from "react";
import needle from "../../assets/images/needle.svg";

function RecordPlayer({ currentSong, isPlaying }) {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setAnimationClass(isPlaying ? "run" : "pause");
  }, [isPlaying]);

  return (
    <section className="record-player">
      <div className={`record-player__record ${animationClass}`}>
        <img
          src={currentSong.album.images[1].url}
          alt="album cover"
          className="record-player__record__cover"
        />
      </div>
      <img src={needle} alt="record needle" className="record-player__needle" />
    </section>
  );
}

export default RecordPlayer;
