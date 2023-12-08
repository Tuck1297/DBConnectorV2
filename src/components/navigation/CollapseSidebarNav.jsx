import CollapseSidebarNavChildren from "./CollapseSidebarNavChildren";
const CollapseSidebarNav = ({
  subMenuName = "",
  navElements = [],
  setPanel,
  mainIcon,
  subIcons = []
}) => {
  return (
    <li>
      <a
        href={`#${subMenuName.replace(" ", "-")}`}
        data-bs-toggle="collapse"
        className="nav-link px-0 allign-middle"
      >
        {mainIcon}
        <span className="ms-1 d-none d-sm-inline text-white ms-2">
          {subMenuName}
        </span>
      </a>
      <ul
        className="collapse nav flex-column ms-1"
        id={`${subMenuName.replace(" ", "-")}`}
        data-bs-parent="#menu"
      >
        <CollapseSidebarNavChildren
          navElements={navElements}
          navElementsIcons={subIcons}
          setPanel={setPanel}
        />
      </ul>
    </li>
  );
};

export default CollapseSidebarNav;
