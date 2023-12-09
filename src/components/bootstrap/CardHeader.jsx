import propTypes from "prop-types";
const CardHeader = ({ className = "", children, ...props }) => {
  const combinedClasses = className != "" ? `card-header ${className}` : "card-header";
  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  style: propTypes.object,
  children: propTypes.node,
  className: propTypes.string,
};

export default CardHeader;
