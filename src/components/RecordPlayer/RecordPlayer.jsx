import "./RecordPlayer.scss";
import AlbumCover from "../../assets/images/album-cover.svg";
import Needle from "../../assets/images/needle.svg";

function RecordPlayer() {
  return (
    <section className="record-player">
      <div className="record-player__record">
        <img
          src={AlbumCover}
          alt="album cover"
          className="record-player__record__img"
        />
        <img src={Needle} alt="record needle" className="record-player__needle"/>
      </div>
    </section>
  );
}

export default RecordPlayer;
