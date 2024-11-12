import ninjalogo from "../../icons/ninja.svg";
import "./NinjaHeader.css";
const NinjaHeader = () => {
  return (
    <div className="header">
      <img src={ninjalogo} alt="ninja one logo" className="logo-img" />
    </div>
  );
};

export default NinjaHeader;
