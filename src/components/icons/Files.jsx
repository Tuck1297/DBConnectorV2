const FilesIcon = ({ size = 24, color = "currentColor", ...props }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 24 24" {...props}>
    <path d="M17.4 2.4H9a2.4 2.4 0 0 0-2.4 2.4 2.4 2.4 0 0 0-2.4 2.4v12a2.4 2.4 0 0 0 2.4 2.4H15a2.4 2.4 0 0 0 2.4-2.4 2.4 2.4 0 0 0 2.4-2.4v-12a2.4 2.4 0 0 0-2.4-2.4Zm0 15.6V7.2A2.4 2.4 0 0 0 15 4.8H7.8A1.2 1.2 0 0 1 9 3.6h8.4a1.2 1.2 0 0 1 1.2 1.2v12a1.2 1.2 0 0 1-1.2 1.2ZM5.4 7.2A1.2 1.2 0 0 1 6.6 6H15a1.2 1.2 0 0 1 1.2 1.2v12a1.2 1.2 0 0 1-1.2 1.2H6.6a1.2 1.2 0 0 1-1.2-1.2v-12Z" />
  </svg>
);

export default FilesIcon;