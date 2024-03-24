import "./MusicPlayer.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import RecordPlayer from "../RecordPlayer/RecordPlayer";
import SongList from "../SongList/SongList";
import Loader from "../Loader/Loader";
import nextIcon from "../../assets/icons/next.svg";
import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import previousIcon from "../../assets/icons/previous.svg";

function MusicPlayer({ token }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef();

  useEffect(() => {
    // Fetch users liked songs
    const fetchLikedSongs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/tracks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedSongs(response.data.items);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching liked songs");
        setIsLoading(false);
      }
    };

    fetchLikedSongs();
  }, [token]);

  // Handle navigation through the likedSongs array in the music player
  // Increments the current song index, wrapping around to the beginning if it reaches the end
  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % likedSongs.length);
  };

  // Decrements the current song index, wrapping around to the end if it goes below 0
  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) => {
      let newIndex = (prevIndex - 1) % likedSongs.length;
      if (newIndex < 0) {
        newIndex = likedSongs.length - 1;
      }
      return newIndex;
    });
  };

  // Event handlers for managing the playback state of the audio element
  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    playNextSong();
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  // Loading, error and empty state handles
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!likedSongs.length) {
    return <div>No liked songs found.</div>;
  }

  const currentSong = likedSongs[currentSongIndex].track;

  return (
    <section className="music-player">
      <SongList likedSongs={likedSongs} onSongSelect={handleSongSelect} className="music-player__song-list"/>
      <RecordPlayer currentSong={currentSong} isPlaying={isPlaying} className="music-player__record"/>
      <div className="music-player__details">
        <h1 className="music-player__track">{currentSong.name}</h1>
        <h2 className="music-player__artist">
          {currentSong.artists.map((artist) => artist.name).join(", ")}
        </h2>
        <audio
          autoPlay
          className="music-player__audio"
          src={currentSong.preview_url}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onClick={playNextSong}
          ref={audioPlayer}
        />
        <div className="music-player__controls">
          <button onClick={playPreviousSong} className="music-player__control">
            <img src={previousIcon} alt="previous" />
          </button>
          <button onClick={togglePlayPause} className="music-player__control">
            <img src={isPlaying ? pauseIcon : playIcon} alt="pause/play" />
          </button>
          <button onClick={playNextSong} className="music-player__control">
            <img src={nextIcon} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default MusicPlayer;
