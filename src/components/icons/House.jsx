const HouseIcon = ({ size = 24, color = "currentColor", ...props }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      d="m11.52 5.872 7.2 7.2v5.048a1.8 1.8 0 0 1-1.8 1.8H6.12a1.8 1.8 0 0 1-1.8-1.8v-5.048l7.2-7.2Zm6-.952v4.2l-2.4-2.4v-1.8a.6.6 0 0 1 .6-.6h1.2a.6.6 0 0 1 .6.6Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M10.672 3.72a1.2 1.2 0 0 1 1.697 0l7.976 7.976a.6.6 0 1 1-.85.85L11.52 4.568l-7.975 7.976a.6.6 0 0 1-.85-.85l7.977-7.975Z"
      clipRule="evenodd"
    />
  </svg>
);

export default HouseIcon;
