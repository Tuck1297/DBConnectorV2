import propTypes from "prop-types";
const CenterElement = ({ className = "", children, ...props }) => {
  const classes = "d-flex justify-content-center align-items-center h-100"
  const combinedClasses = className != "" ? `${className} ${classes}` : classes;
    return (
    <div
      className={combinedClasses}
      {...props}
    >
      {children}
    </div>
  );
};

CenterElement.propTypes = {
  style: propTypes.object,
  children: propTypes.node,
  className: propTypes.string,
};

export default CenterElement;
