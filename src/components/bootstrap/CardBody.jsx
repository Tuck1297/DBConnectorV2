import propTypes from "prop-types";
const CardBody = ({ className = "", children, ...props }) => {
  const combinedClasses =
    className != "" ? `card-body p-2 ${className}` : "card-body p-2";
  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  style: propTypes.object,
  children: propTypes.node,
  className: propTypes.string,
};

export default CardBody;
