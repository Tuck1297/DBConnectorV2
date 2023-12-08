import ConnectionForm from "../interaction/form/ConnectionForm";
import CenterElement from "../bootstrap/CenterElement";
const ConnectionView = ({ connection }) => {
  return (
    <>
      <CenterElement>
        <ConnectionForm />
      </CenterElement>
    </>
  );
};
export default ConnectionView;
