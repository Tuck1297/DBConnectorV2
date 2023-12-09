import { render } from "@testing-library/react";
import CardBody from "../components/bootstrap/CardBody";
describe('CardBody', () => {

    // Returns a div element with class 'card-body p-2' and any additional classes passed in the 'className' prop, and any additional props passed in the 'props' object, and with the children passed in the 'children' prop.
    it('should return a div element with class \'card-body p-2\', additional classes, additional props, and children', () => {
      // Arrange
      const className = "additional-class";
      const children = "Test Children";
      const props = { id: "test-id" };

      // Act
      const result = CardBody({ className, children, ...props });

      // Assert
      expect(result.type).toBe('div');
      expect(result.props.className).toBe('card-body p-2 additional-class');
      expect(result.props.children).toBe('Test Children');
      expect(result.props.id).toBe('test-id');
    });

    // When no props are passed, returns a div element with class 'card-body p-2'.
    it('should return a div element with class \'card-body p-2\' when no props are passed', () => {
      // Act
      const result = CardBody({});

      // Assert
      expect(result.type).toBe('div');
      expect(result.props.className).toBe('card-body p-2');
      expect(result.props.children).toBeUndefined();
    });

    // When only the 'className' prop is passed, returns a div element with class 'card-body p-2' and the class passed in the 'className' prop.
    it('should return a div element with class \'card-body p-2\' and the class passed in the \'className\' prop', () => {
      // Arrange
      const className = "additional-class";

      // Act
      const result = CardBody({ className });

      // Assert
      expect(result.type).toBe('div');
      expect(result.props.className).toBe('card-body p-2 additional-class');
      expect(result.props.children).toBeUndefined();
    });

    // When only the 'children' prop is passed, returns a div element with class 'card-body p-2' and the children passed in the 'children' prop.
    it('should return a div element with class \'card-body p-2\' and the children passed in the \'children\' prop', () => {
      // Arrange
      const children = "Test Children";

      // Act
      const result = CardBody({ children });

      // Assert
      expect(result.type).toBe('div');
      expect(result.props.className).toBe('card-body p-2');
      expect(result.props.children).toBe('Test Children');
    });

    // When only the 'props' object is passed, returns a div element with class 'card-body p-2' and any additional props passed in the 'props' object.
    it('should return a div element with class \'card-body p-2\' and any additional props passed in the \'props\' object', () => {
      // Arrange
      const props = { id: "test-id" };

      // Act
      const result = CardBody({ ...props });

      // Assert
      expect(result.type).toBe('div');
      expect(result.props.className).toBe('card-body p-2');
      expect(result.props.children).toBeUndefined();
      expect(result.props.id).toBe('test-id');
    });

    // When the 'className' prop and 'children' prop are passed, returns a div element with class 'card-body p-2', the class passed in the 'className' prop, and the children passed in the 'children' prop.
    it('should return a div element with class \'card-body p-2\', the class passed in the \'className\' prop, and the children passed in the \'children\' prop', () => {
      // Arrange
      const className = "additional-class";
      const children = "Test Children";

      // Act
      const result = CardBody({ className, children });

      // Assert
      expect(result.type).toBe('div');
      expect(result.props.className).toBe('card-body p-2 additional-class');
      expect(result.props.children).toBe('Test Children');
    });
});
