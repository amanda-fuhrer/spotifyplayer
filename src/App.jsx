import "./App.scss";
import RecordPlayer from "./components/RecordPlayer/RecordPlayer";
import Speaker from "./components/Speaker/Speaker";

function App() {
  return (
    <div className="App">
      <Speaker />
      <RecordPlayer />
    </div>
  );
}

export default App;
