import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import propTypes from "prop-types";

const Card = ({ className = "", children, header, ...props }) => {
  if (!children && !header) return;
  return (
    <div className={`card ${className}`} {...props}>
      <CardHeader className="text-center fs-4">{header}</CardHeader>
      <CardBody>{children}</CardBody>
    </div>
  );
};

Card.propTypes = {
  style: propTypes.object,
  header: propTypes.string,
  children: propTypes.node,
  className: propTypes.string,
}

export default Card;
