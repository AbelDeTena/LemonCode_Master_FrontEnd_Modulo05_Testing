import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from '../../models/index';

describe('common/components/confirmation-dialog.hook', () => {
  it('should return the Empty Lookup', () => {
    //arrange

    //act
    const { result } = renderHook(() => useConfirmationDialog());
    //assert
    const emptyLookup: Lookup = { id: '', name: '' };
    expect(result.current.itemToDelete).toEqual(emptyLookup);
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });
  it('should update itemToDelete and isOpen when it calls onOpenDialog', () => {
    // Arrange
    const newItemToDelete: Lookup = { id: 'test id', name: 'test name' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(newItemToDelete);
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(newItemToDelete);
    expect(result.current.isOpen).toEqual(true);
  });

  it('should reset itemToDelete when calling onAccept after opening the dialog', () => {
    // arrange
    const newItemToDelete: Lookup = { id: 'test id', name: 'test name' };

    // act 1
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(newItemToDelete);
    });

    // assert 1
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(newItemToDelete);

    // act 2
    act(() => {
      result.current.onAccept();
    });

    // assert 2
    const expectedItemToDelete: Lookup = { id: '', name: '' };
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(expectedItemToDelete);
  });

  it('should set isOpen to false when calling onClose after opening the dialog', () => {
    // arrange
    const newItemToDelete: Lookup = { id: 'test id', name: 'test name' };

    // act 1
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(newItemToDelete);
    });

    // assert 1
    expect(result.current.isOpen).toEqual(true);

    // act 2
    act(() => {
      result.current.onClose();
    });

    // assert 2
    expect(result.current.isOpen).toEqual(false);
  });
});
