import "./MusicPlayer.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import RecordPlayer from "../RecordPlayer/RecordPlayer";

function MusicPlayer({ token }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) =>(prevIndex + 1) % likedSongs.length
    );
  };

  // Loading, error and empty state handles
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!likedSongs.length) {
    return <div>No liked songs found.</div>;
  }

  const currentSong = likedSongs[currentSongIndex].track;

  return (
    <section className="music-player">
      <RecordPlayer currentSong={currentSong} />
      <div className="music-player__controls">
        <h1 className="music-player__track">{currentSong.name}</h1>
        <h2 className="music-player__artist">
          {currentSong.artists.map((artist) => artist.name).join(", ")}
        </h2>
        <audio controls autoPlay src={currentSong.preview_url}></audio>
        <button onClick={playNextSong}>Next</button>
      </div>
    </section>
  );
}

export default MusicPlayer;
