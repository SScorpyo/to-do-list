import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type infoCardPropTypes = { type: string; value: string; progress: number };

const InfoCard = ({ type, value, progress }: infoCardPropTypes) => {
  return (
    <div className="info-card text-white bg-slate-900 w-44 p-3.5 flex flex-col gap-2.5">
      <p className="font-medium">{type}</p>
      <p className="font-semibold text-3xl">{value}</p>
      <div className={`info-progress flex ${progress > 0 ? "items-end" : "items-start"} gap-2.5`}>
        {progress < 0 && <FontAwesomeIcon icon={faSortDown} style={{ color: "red" }} />}
        {progress > 0 && <FontAwesomeIcon icon={faSortUp} style={{ color: "green" }} />}
        <p>{Math.abs(progress)}%</p>
      </div>
    </div>
  );
};

export default InfoCard;
