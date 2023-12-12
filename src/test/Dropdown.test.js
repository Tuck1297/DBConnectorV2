import {render, screen, fireEvent} from '@testing-library/react';
import Dropdown from "../components/interaction/inputs/Dropdown";

// Generated by CodiumAI

describe('Dropdown', () => {

    // Renders a select element with options based on the 'elements' prop
    it('should render a select element with options based on the "elements" prop', () => {
      // Arrange
      const elements = ["option1", "option2", "option3"];
      const initial = "option2";
      const title = "Select an option";
      const disable = false;

      // Act
      render(<Dropdown elements={elements} initial={initial} title={title} disable={disable} />);

      // Assert
      const selectElement = screen.getByRole("combobox");
      expect(selectElement).toBeInTheDocument();
      expect(selectElement).toHaveValue(initial);
      expect(selectElement).toHaveTextContent(elements.join(""));
    });

    // Sets the initial value of the select element to the 'initial' prop
    it('should set the initial value of the select element to the "initial" prop', () => {
      // Arrange
      const elements = ["option1", "option2", "option3"];
      const initial = "option2";
      const title = "Select an option";
      const disable = false;

      // Act
      render(<Dropdown elements={elements} initial={initial} title={title} disable={disable} />);

      // Assert
      const selectElement = screen.getByRole("combobox");
      expect(selectElement).toHaveValue(initial);
    });

    // Updates the value of the select element when an option is selected
    it('should update the value of the select element when an option is selected', () => {
      // Arrange
      const elements = ["option1", "option2", "option3"];
      const initial = "option2";
      const title = "Select an option";
      const disable = false;

      // Act
      render(<Dropdown elements={elements} initial={initial} title={title} disable={disable} />);
      const selectElement = screen.getByRole("combobox");
      fireEvent.change(selectElement, { target: { value: "option3" } });

      // Assert
      expect(selectElement).toHaveValue("option3");
    });

    // Renders a select element with no options when 'elements' prop is an empty array
    it('should render a select element with no options when "elements" prop is an empty array', () => {
      // Arrange
      const elements = [];
      const initial = "";
      const title = "Select an option";
      const disable = false;

      // Act
      render(<Dropdown elements={elements} initial={initial} title={title} disable={disable} />);

      // Assert
      const selectElement = screen.getByRole("combobox");
      expect(selectElement).toBeInTheDocument();
      expect(selectElement).toBeEmptyDOMElement();
    });

    // Renders a select element with only one option when 'elements' prop has length 1
    it('should render a select element with only one option when "elements" prop has length 1', () => {
      // Arrange
      const elements = ["option1"];
      const initial = "option1";
      const title = "Select an option";
      const disable = false;

      // Act
      render(<Dropdown elements={elements} initial={initial} title={title} disable={disable} />);

      // Assert
      const selectElement = screen.getByRole("combobox");
      expect(selectElement).toBeInTheDocument();
      expect(selectElement).toHaveValue(initial);
      expect(selectElement).toHaveTextContent(elements[0]);
    });
});
