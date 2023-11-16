import { Link } from "react-router-dom";

const Card = ({ to, children, className, onClick, ...props }) => {
  return (
    <div
      className={`ml-4 w-[250px] ${className} rounded-xl bg-white border-2 p-5`}
    >
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default Card;
