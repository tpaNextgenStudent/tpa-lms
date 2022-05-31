import { render, screen, within } from '@testing-library/react';
import { CodeAction } from '../../components/tasks/CodeAction/CodeAction';
import userEvent from '@testing-library/user-event';

// Mocks useRouter
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

userEvent.setup();

describe('CodeAction', () => {
  it('Should open submit warning only after first copy click', async () => {
    useRouter.mockImplementation(() => ({
      route: '/student/tasks/[module]/[task]',
      pathname: '/student/tasks/[module]/[task]',
      query: '',
      asPath: '/student/tasks/moduleId/taskId',
    }));

    render(<CodeAction github_link={''} />);

    //no toast at initial render
    const toast = screen.queryByTestId('toast');
    expect(toast).not.toBeInTheDocument();

    screen.getAllByTestId('code-action-line').forEach(codeLine => {
      expect(
        within(codeLine).getByTestId('code-action-line-value')
      ).toBeVisible();
      expect(
        within(codeLine).getByTestId('code-action-line-value')
      ).toBeVisible();
    });

    const firstLine = screen.getAllByTestId('code-action-line')[0];
    const button = within(firstLine).getByTestId('code-action-line-button');

    //open at first click
    button.click();
    expect(await screen.findByTestId('toast')).toBeInTheDocument();

    //close
    screen.getByTestId('toast-close').click();
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();

    //does not open after 2nd click
    button.click();
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
  });
});
