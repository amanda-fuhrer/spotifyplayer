import "./App.scss";
import { useEffect, useState } from "react";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";

function App() {
  const authEndpoint = "https://accounts.spotify.com/authorize?";
  const clientID = "c033eeb2e84b4c1b9ac6f858f3c68a27";
  const redirectUri = "https://trackspin-amandafuhrer.vercel.app";
  const scopes = ["user-library-read", "streaming"];
  const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialogue=true`;

  const [token, setToken] = useState("");

  // Handle user logout
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("tokenExpiration");
    setToken("");
  };

  useEffect(() => {
    const getTokenFromLocalStorage = () => window.localStorage.getItem("token");

    // Extracting token from URL hash or local storage
    const hash = window.location.hash;
    window.location.hash = "";
    const newToken = hash ? hash.split("&")[0].split("=")[1] : getTokenFromLocalStorage();

    // Handle token expiration and refreshing token if necessary
    if (newToken) {
      const expiresIn = hash ? parseInt(hash.split("&")[2].split("=")[1]) : null;
      if (expiresIn) {
        const expirationTime = Date.now() / 1000 + expiresIn;
        window.localStorage.setItem("tokenExpiration", expirationTime);
      }
      window.localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      setToken(getTokenFromLocalStorage());
    }
    // Check token expiration and redirect to login if expired
    const checkTokenExpiration = () => {
      const tokenExpiration = window.localStorage.getItem("tokenExpiration");
      const currentTime = Date.now() / 1000;
      if (tokenExpiration && currentTime > parseInt(tokenExpiration)) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenExpiration");
        window.location.href = loginEndpoint;
      }
    };

    // Check token expiration every hour (based on Spotify API documentation)
    const intervalId = setInterval(checkTokenExpiration, 60 * 60 * 1000);
    checkTokenExpiration();
    return () => clearInterval(intervalId);
  }, [loginEndpoint]);

  return (
    <div className="App">
      {!token ? (
        <Login loginEndpoint={loginEndpoint}/>
      ) : (
        <div>
          <div className="App__header">
            <Header logout={logout} />
          </div>
          <div className="App__body">
            <MusicPlayer token={token} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
