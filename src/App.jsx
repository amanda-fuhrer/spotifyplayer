import "./App.scss";
import RecordPlayer from "./components/RecordPlayer/RecordPlayer";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";

function App() {
  const authEndpoint = "https://accounts.spotify.com/authorize?";
  const clientID = "c033eeb2e84b4c1b9ac6f858f3c68a27";
  const redirectUri = "http://localhost:3000";
  const scopes = ["user-library-read", "playlist-read-private"];
  const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialogue=true`;

  const [token, setToken] = useState("");

  useEffect(() => {
    // Retrieve token and hash
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
  
    // Clear the hash from URL
    window.location.hash = "";
  
    // Set token based on presence of token and hash
    const newToken = hash ? hash.split("&")[0].split("=")[1] : token;
    if (newToken) {
      window.localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      setToken(token);
    }
  }, []);

  return (
    <div className="App">
      {!token ? (
        <Login loginEndpoint={loginEndpoint} />
      ) : (
        <>
          <RecordPlayer />
          <MusicPlayer />
        </>
      )}
    </div>
  );
}

export default App;
