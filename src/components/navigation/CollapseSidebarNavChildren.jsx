const CollapseSidebarNavChild = ({ navElements = [], setPanel, navElementsIcons }) => {
  return (
    <>
      {navElements.map((navElement, index) => (
        <li className="w-100" key={index}>
          <button
            className="nav-link px-0 ms-4 text-white"
            onClick={() => {
              setPanel(navElement.toLowerCase());
            }}
          >
            {navElementsIcons[index]}
            <span className="d-none d-sm-inline ms-2">{navElement}</span>
          </button>
        </li>
      ))}
    </>
  );
};
export default CollapseSidebarNavChild;
