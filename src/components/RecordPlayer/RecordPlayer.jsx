import "./RecordPlayer.scss";
import { useState, useEffect } from "react";
import needle from "../../assets/images/needle.svg";
import vinyl from "../../assets/images/vinyl.svg";

function RecordPlayer({ isPlaying }) {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setAnimationClass(isPlaying ? "run" : "pause");
  }, [isPlaying]);

  return (
    <section className="record-player">
      <img src={vinyl} alt="vinyl" className={`record-player__record ${animationClass}`}/>
      <img src={needle} alt="record needle" className="record-player__needle" />
    </section>
  );
}

export default RecordPlayer;
