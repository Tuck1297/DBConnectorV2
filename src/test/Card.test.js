import { render } from "@testing-library/react";
import Card from "../components/bootstrap/Card";
describe('Card', () => {

    // Renders a div with class 'card' and any additional classes passed as props
    it('should render a div with class \'card\' and additional classes when passed as props', () => {
      const { container } = render(<Card className="custom-class">Test Body</Card>);
      expect(container.firstChild).toHaveClass('card custom-class');
    });

    // Renders a CardHeader component with the 'header' prop passed as children
    it('should render a CardHeader component with the \'header\' prop passed as children', () => {
      const { getByText } = render(<Card header="Test Header"></Card>);
      expect(getByText('Test Header')).toBeInTheDocument();
    });

    // Renders a CardBody component with any children passed as props
    it('should render a CardBody component with any children passed as props', () => {
      const { getByText } = render(<Card>Test Body</Card>);
      expect(getByText('Test Body')).toBeInTheDocument();
    });

    // Does not render anything if no children or header props are passed
    it('should not render anything if no children or header props are passed', () => {
      const { container } = render(<Card />);
      expect(container.firstChild).toBeNull();
    });

    // Renders without error if no className prop is passed
    it('should render without error if no className prop is passed', () => {
      expect(() => {
        render(<Card />);
      }).not.toThrow();
    });

    // Renders without error if no props are passed
    it('should render without error if no props are passed', () => {
      expect(() => {
        render(<Card />);
      }).not.toThrow();
    });
});