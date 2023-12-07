const ListIcon = ({ size = 24, color = "currentColor", ...props }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      d="M4.92 17.28a.6.6 0 0 1 .6-.6h12a.599.599 0 1 1 0 1.2h-12a.6.6 0 0 1-.6-.6Zm0-4.8a.6.6 0 0 1 .6-.6h12a.599.599 0 1 1 0 1.2h-12a.6.6 0 0 1-.6-.6Zm0-4.8a.6.6 0 0 1 .6-.6h12a.6.6 0 1 1 0 1.2h-12a.6.6 0 0 1-.6-.6Z"
      clipRule="evenodd"
    />
  </svg>
);

export default ListIcon;
