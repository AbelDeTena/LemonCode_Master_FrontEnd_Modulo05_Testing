import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { SpinnerComponent } from './spinner.component';

let mockPromiseInProgress = false;

jest.mock('react-promise-tracker', () => ({
  usePromiseTracker: () => ({ promiseInProgress: mockPromiseInProgress }),
}));

describe('common/components/spinner/spinner.component', () => {
  it('should show and hide the spinner based on promises', async () => {
    // arrange 1
    mockPromiseInProgress = false;

    // act 1
    const { queryByRole } = render(<SpinnerComponent />);

    // assert 1
    expect(queryByRole('presentation')).toBe(null);

    // arrange 2
    mockPromiseInProgress = true;

    // act 2
    act(() => {
      render(<SpinnerComponent />);
    });

    const { getByRole } = render(<SpinnerComponent />);

    // assert 2
    expect(getByRole('presentation')).toBeInTheDocument();
  });
});
