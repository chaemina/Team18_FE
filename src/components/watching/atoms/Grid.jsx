const Grid = ({ children, className }) => {
  const baseClasses = "flex flex-wrap justify-center items-center";
  const combinedClasses = `${baseClasses} ${className}`;

  return <div className={combinedClasses}>{children}</div>;
};

export default Grid;
