import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginDetailsForm } from '../../components/login/LoginDetailsForm/LoginDetailsForm';
import '@testing-library/jest-dom';
const mockSubmit = jest.fn(() => {
  return Promise.resolve();
});

describe('LoginDetailsForm', () => {
  it('Should render empty form', async () => {
    render(<LoginDetailsForm onSubmit={mockSubmit} />);
    expect(screen.queryByTestId('name-input')).toHaveValue('');
    expect(screen.queryByTestId('surname-input')).toHaveValue('');
    expect(screen.queryByTestId('bio-input')).toHaveValue('');
  });

  it('Should display required error when all fields are empty', async () => {
    render(<LoginDetailsForm onSubmit={mockSubmit} />);

    //there are no validation errors at first
    expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('surname-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bio-error')).not.toBeInTheDocument();

    fireEvent.submit(screen.getByTestId('cta-button'));

    expect(await screen.findByTestId('name-error')).toBeVisible();
    expect(await screen.findByTestId('surname-error')).toBeVisible();
    expect(await screen.findByTestId('bio-error')).toBeVisible();
    expect(mockSubmit).not.toBeCalled();
  });

  it('Should not allow to submit when one of the fields is empty', async () => {
    render(<LoginDetailsForm onSubmit={mockSubmit} />);
    expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('surname-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bio-error')).not.toBeInTheDocument();

    fireEvent.input(screen.getByTestId('name-input'), {
      target: { value: 'Firstname' },
    });

    fireEvent.submit(screen.getByTestId('cta-button'));
    expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
    expect(await screen.findByTestId('surname-error')).toBeVisible();
    expect(await screen.findByTestId('bio-error')).toBeVisible();
    expect(mockSubmit).not.toBeCalled();

    fireEvent.input(screen.getByTestId('surname-input'), {
      target: { value: 'Lastname' },
    });
    expect(await screen.findByTestId('surname-error')).not.toBeInTheDocument();

    fireEvent.submit(screen.getByTestId('cta-button'));
    expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('surname-error')).not.toBeInTheDocument();
    expect(await screen.findByTestId('bio-error')).toBeVisible();
    expect(mockSubmit).not.toBeCalled();

    fireEvent.input(screen.getByTestId('bio-input'), {
      target: { value: 'I love typeScript!' },
    });
    expect(await screen.findByTestId('bio-error')).not.toBeInTheDocument();
    expect(mockSubmit).not.toBeCalled();

    fireEvent.submit(screen.getByTestId('cta-button'));
    await waitFor(() => expect(mockSubmit).toBeCalledTimes(1));
  });
});
