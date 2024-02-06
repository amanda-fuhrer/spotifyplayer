import "./RecordPlayer.scss";
import Needle from "../../assets/images/needle.svg";

function RecordPlayer({ currentSong }) {
  return (
    <section className="record-player">
      <div className="record-player__record">
        <img
          src={currentSong.album.images[1].url}
          alt="album cover"
          className="record-player__record__img"
        />
        <img
          src={Needle}
          alt="record needle"
          className="record-player__needle"
        />
      </div>
    </section>
  );
}

export default RecordPlayer;
