import "./RecordPlayer.scss";
import Needle from "../../assets/images/needle.svg";

function RecordPlayer({ currentSong, isPlaying }) {
  return (
    <section className="record-player">
      <div className={`record-player__record ${isPlaying ? 'spin' : ''}`}>
        <img
          src={currentSong.album.images[1].url}
          alt="album cover"
          className="record-player__record__cover"
        />
      </div>
      <img
          src={Needle}
          alt="record needle"
          className="record-player__needle"
        />
    </section>
  );
}

export default RecordPlayer;
