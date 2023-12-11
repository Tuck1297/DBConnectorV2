import {render, screen} from '@testing-library/react';
import Page from "../components/bootstrap/Page";

describe('Page', () => {

    // Renders a Row component
    it('should render a Row component', () => {
      render(<Page> Test body </Page>);
      expect(screen.getByRole('row')).toBeInTheDocument();
    });

    // Renders a Col component with ColNumSize prop set to 12
    it('should render a Col component with ColNumSize prop set to 12', () => {
      render(<Page> Test body </Page>);
      expect(screen.getByRole('col')).toHaveClass('col-md-12');
    });

    // Renders a section element with rounded-3, border, border-3, w-100 and bg-white classes
    it('should render a section element with specified classes', () => {
      render(<Page> Test body </Page>);
      expect(screen.getByRole('page-body')).toHaveClass('rounded-3 border border-3 w-100 bg-white');
    });

    // children prop is not passed
    it('should not render any children', () => {
      render(<Page />);
      expect(screen.queryByRole('row')).toBeEmptyDOMElement();
    });
});
