import propTypes from "prop-types";
const Row = ({ children, className = "", ...props }) => {
  const combinedClasses =
    className != "" ? `row w-100 h-100 ${className}` : "row w-100 h-100";
  return (
    <div className={combinedClasses} {...props} role="row">
      {children}
    </div>
  );
};

Row.propTypes = {
  style: propTypes.object,
  children: propTypes.node,
  className: propTypes.string,
};

export default Row;
