import { Link } from "react-router-dom";

const Card = ({ to, children, ...props }) => {
  return (
    <div className="ml-4 w-[250px] rounded-xl bg-white mt-10 border-2 justify-center items-center flex flex-col p-5">
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default Card;
