import propTypes from "prop-types";
const Col = ({
  children,
  className = "",
  ColNumSize = 6,
  ColSize = "md",
  ...props
}) => {
  const combinedClasses = `col-${ColSize}-${ColNumSize} ${
    className != "" ? `${className}` : ""
  }`;
  return (
    <div className={combinedClasses} {...props} role="col">
      {children}
    </div>
  );
};

Col.propTypes = {
  style: propTypes.object,
  children: propTypes.node,
  className: propTypes.string,
  ColNumSize: propTypes.number,
  ColSize: propTypes.string,
};

export default Col;
