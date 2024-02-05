import "./Speaker.scss";
import SpeakerGrill from "../../assets/images/speaker-grill.svg";

function Speaker() {
  return (
    <section className="speaker">
      <img src={SpeakerGrill} alt="speaker grill" className="speaker__img" />
    </section>
  );
}

export default Speaker;
