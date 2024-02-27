import "./App.scss";
import { useEffect, useState } from "react";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";

function App() {
  const authEndpoint = "https://accounts.spotify.com/authorize?";
  const clientID = "c033eeb2e84b4c1b9ac6f858f3c68a27";
  const redirectUri = "http://localhost:3000";
  const scopes = ["user-library-read", "streaming"];
  const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialogue=true`;

  const [token, setToken] = useState("");

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("tokenExpiration");
    setToken("");
  };

  useEffect(() => {
    const getTokenFromLocalStorage = () => window.localStorage.getItem("token");

    const hash = window.location.hash;
    window.location.hash = "";

    const newToken = hash
      ? hash.split("&")[0].split("=")[1]
      : getTokenFromLocalStorage();

    if (newToken) {
      const expiresIn = hash
        ? parseInt(hash.split("&")[2].split("=")[1])
        : null;
      if (expiresIn) {
        const expirationTime = Date.now() / 1000 + expiresIn;
        window.localStorage.setItem("tokenExpiration", expirationTime);
      }
      window.localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      setToken(getTokenFromLocalStorage());
    }

    const checkTokenExpiration = () => {
      const tokenExpiration = window.localStorage.getItem("tokenExpiration");
      const currentTime = Date.now() / 1000;
      if (tokenExpiration && currentTime > parseInt(tokenExpiration)) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenExpiration");
        window.location.href = loginEndpoint;
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 60 * 1000);

    checkTokenExpiration();

    return () => clearInterval(intervalId);
  }, [loginEndpoint]);

  return (
    <div className="App">
      <div className="App__header">
        <Header logout={logout} />
      </div>
      <div className="App__body">
        {!token ? <Login loginEndpoint={loginEndpoint} /> : <MusicPlayer token={token} />}
      </div>
    </div>
  );
}

export default App;
