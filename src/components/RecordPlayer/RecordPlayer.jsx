import "./RecordPlayer.scss";
import Record from "../../assets/images/record.svg";

function RecordPlayer() {
  return (
    <section className="record">
      <img src={Record} alt="vinyl record" className="record__img"/>
    </section>
  );
}

export default RecordPlayer;
