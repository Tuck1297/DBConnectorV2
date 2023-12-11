import {render, screen} from '@testing-library/react';
import Textbox from "../components/Interaction/inputs/Textbox";
describe('Textbox', () => {

    // Renders a text input with default props when no props are passed
    it('should render a text input with default props when no props are passed', () => {
      render(<Textbox />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveClass('form-control');
      expect(input).toHaveAttribute('placeholder', '');
      expect(input).toHaveAttribute('id', 'Input');
      expect(input).not.toBeDisabled();
      const label = screen.getByLabelText('');
      expect(label).toBeInTheDocument();
    });

    // Renders a text input with custom props when passed as props
    it('should render a text input with custom props when passed as props', () => {
      const customProps = {
        inputType: 'email',
        className: 'custom-class',
        placeholder: 'Enter email',
        label: 'Email',
        disabled: true,
      };
      render(<Textbox {...customProps} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveClass('form-control custom-class');
      expect(input).toHaveAttribute('placeholder', 'Enter email');
      expect(input).toHaveAttribute('id', 'emailInput');
      expect(input).toBeDisabled();
      const label = screen.getByLabelText('Email');
      expect(label).toBeInTheDocument();
    });

    // Renders a password input when inputType prop is set to "password"
    it('should render a password input when inputType prop is set to "password"', () => {
      const customProps = {
        inputType: 'password',
      };
      render(<Textbox {...customProps} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
    });

    // Renders a text input with an empty string as a placeholder when placeholder prop is not passed
    it('should render a text input with an empty string as a placeholder when placeholder prop is not passed', () => {
      render(<Textbox />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', '');
    });

    // Renders a text input with an empty string as a className when className prop is not passed
    it('should render a text input with an empty string as a className when className prop is not passed', () => {
      render(<Textbox />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('form-control');
    });

    // Renders a text input with an empty string as a label when label prop is not passed
    it('should render a text input with an empty string as a label when label prop is not passed', () => {
      render(<Textbox />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      const label = screen.getByLabelText('');
      expect(label).toBeInTheDocument();
    });
});
