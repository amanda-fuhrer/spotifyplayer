import { useEffect, useState } from 'react';
import './SongList.scss';

function SongList({ likedSongs, onSongSelect, currentPlayingIndex }) {
  const [selectedSongIndex, setSelectedSongIndex] = useState(currentPlayingIndex || 0);

  useEffect(() => {
    setSelectedSongIndex(currentPlayingIndex);
  }, [currentPlayingIndex]);

  const handleSongSelect = (index) => {
    setSelectedSongIndex(index);
    onSongSelect(index);
  };

  return (
    <section className="songs-list">
      <ul className="songs-list__container">
        <li className="songs-list__header">
          <div className="songs-list__index-header">#</div>
          <div className="songs-list__title-artist-header">Title</div>
        </li>
        {likedSongs.map((songItem, index) => (
          <li
            key={songItem.track.id}
            className={`songs-list__item ${index === selectedSongIndex ? 'selected' : ''}`}
            onClick={() => handleSongSelect(index)}
          >
            <div className="songs-list__index">{index + 1}</div>
            <div className="songs-list__title-artist">
              <div className="songs-list__track-name">{songItem.track.name}</div>
              <div className="songs-list__artist">
                {songItem.track.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SongList;
