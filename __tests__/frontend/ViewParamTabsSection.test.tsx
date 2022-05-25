import {
  getByText,
  render,
  screen,
  getByLabelText,
} from '@testing-library/react';
import { ViewParamTabsSection } from '../../components/common/ViewParamTabsSection/ViewParamTabsSection';
import userEvent from '@testing-library/user-event';
import { expect } from '@jest/globals';

// Mocks useRouter
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const routerPush = jest.fn();

userEvent.setup();

describe('ViewParamTabsSection', () => {
  it('Should render first tab when no view query specified', async () => {
    useRouter.mockImplementationOnce(() => ({
      query: { view: undefined },
    }));

    render(
      <ViewParamTabsSection
        tabs={{
          description: <p>description</p>,
          comments: <p>comments</p>,
        }}
      />
    );

    expect(screen.getByText('description')).toBeDefined();
  });

  it('Should redirect to first (default) tab when view query is invalid', async () => {
    useRouter.mockImplementationOnce(() => ({
      query: { view: 'there-is-no-tab-like-this' },
      push: routerPush,
    }));

    render(
      <ViewParamTabsSection
        tabs={{
          description: <p>description</p>,
          comments: <p>comments</p>,
        }}
      />
    );

    expect(routerPush).toHaveBeenCalledWith(
      { pathname: undefined, query: {} },
      undefined,
      { shallow: true }
    );
  });

  it('Should render tab based on ?view= query param', async () => {
    useRouter.mockImplementationOnce(() => ({
      query: { view: 'comments' },
    }));

    const { rerender } = render(
      <ViewParamTabsSection
        tabs={{
          description: <p>description</p>,
          comments: <p>comments</p>,
        }}
      />
    );

    expect(screen.getByText('comments')).toBeDefined();

    useRouter.mockImplementation(() => ({
      query: { view: 'description' },
    }));

    rerender(
      <ViewParamTabsSection
        tabs={{
          description: <p>description</p>,
          comments: <p>comments</p>,
        }}
      />
    );

    expect(screen.getByText('description')).toBeDefined();
  });

  it('Switches between tabs', async () => {
    useRouter.mockImplementationOnce(() => ({
      query: { view: 'description' },
      push: routerPush,
    }));

    render(
      <ViewParamTabsSection
        tabs={{
          description: <p>description</p>,
          comments: <p>comments</p>,
        }}
      />
    );

    const button = screen.getByText('Comments');
    button.click();

    expect(routerPush).toHaveBeenCalledWith(
      { pathname: undefined, query: { view: 'comments' } },
      undefined,
      { shallow: true }
    );
  });
});
