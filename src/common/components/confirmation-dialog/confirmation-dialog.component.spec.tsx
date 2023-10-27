import React from 'react';
import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('common/components/confirmation-dialog', () => {
  describe('Control cases', () => {
    it('should render empty when isOpen is false', () => {
      // arrange
      const props = {
        isOpen: false,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: 'Test dialog heading',
        labels: {
          closeButton: 'Close',
          acceptButton: 'Accept',
        },
      };

      // act
      render(
        <ConfirmationDialogComponent {...props}>
          <div>Children</div>
        </ConfirmationDialogComponent>
      );
      // assert
      expect(
        screen.queryByRole('heading', {
          name: /test dialog heading/i,
        })
      ).toBeNull();
    });
  });
  describe('Success cases', () => {
    it('should be render as expected passing required properties when isOpen is true', () => {
      // arrange
      const props = {
        isOpen: true,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: 'Test dialog heading',
        labels: {
          closeButton: 'Close',
          acceptButton: 'Accept',
        },
      };

      // act
      render(
        <ConfirmationDialogComponent {...props}>
          <div>Children</div>
        </ConfirmationDialogComponent>
      );

      // assert
      expect(
        screen.getByRole('heading', {
          name: props.title,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: new RegExp(props.labels.acceptButton, 'i'),
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: new RegExp(props.labels.closeButton, 'i'),
        })
      ).toBeInTheDocument();
      expect(screen.getByLabelText('children')).toBeInTheDocument();
    });
    it('should call onClose when the Close button is clicked', () => {
      // arrange
      const onCloseMock = jest.fn();
      const props = {
        isOpen: true,
        onAccept: jest.fn(),
        onClose: onCloseMock,
        title: 'Test dialog heading',
        labels: {
          closeButton: 'Close',
          acceptButton: 'Accept',
        },
      };

      // act
      render(
        <ConfirmationDialogComponent {...props}>
          <div>Children</div>
        </ConfirmationDialogComponent>
      );

      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      // assert
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
    it('should call onAccept and onClose when the Accept button is clicked', () => {
      // arrange
      const props = {
        isOpen: true,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: 'Test dialog heading',
        labels: {
          closeButton: 'Close',
          acceptButton: 'Accept',
        },
      };

      // act
      render(
        <ConfirmationDialogComponent {...props}>
          <div>Children</div>
        </ConfirmationDialogComponent>
      );
      fireEvent.click(screen.getByRole('button', { name: /accept/i }));

      // assert
      expect(props.onAccept).toHaveBeenCalledTimes(1);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
