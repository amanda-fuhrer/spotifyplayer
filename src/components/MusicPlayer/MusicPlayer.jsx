import "./MusicPlayer.scss";
import Song from "../../assets/media/starboy.mp3";

function MusicPlayer() {
  return (
    <section className="player">
      <h1 className="player__track">Starboy</h1>
      <h2 className="player__artist">The Weeknd</h2>
      <audio controls src={Song} type="audio"></audio>
    </section>
  );
}

export default MusicPlayer;
