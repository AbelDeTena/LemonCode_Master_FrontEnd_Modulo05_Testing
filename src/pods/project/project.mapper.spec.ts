import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('./pods/project/project.mapper', () => {
  describe('Project Mapper - Input Validation Test Cases', () => {
    it.each([null, undefined])(
      'should return empty project when feeding %p value',
      (project) => {
        // Act
        const result = mapProjectFromApiToVm(project);

        // Assert
        expect(result).toEqual(viewModel.createEmptyProject());
      }
    );
    it('should return expected result but feeding undefined employees list when project is null', () => {
      // arrange
      const employee: apiModel.Project = {
        id: 'test id',
        name: 'test name',
        isActive: true,
        externalId: 'external test id',
        comments: 'Test comments',
        employees: null,
      };

      // act
      const result = mapProjectFromApiToVm(employee);

      // assert
      const expectedResult: viewModel.Project = {
        id: 'test id',
        name: 'test name',
        isActive: true,
        externalId: 'external test id',
        comments: 'Test comments',
        employees: [],
      };

      expect(result).toEqual(expectedResult);
    });

    it('should return expected result but feeding undefined employees list when project is undefined', () => {
      // arrange
      const employee: apiModel.Project = {
        id: 'test id',
        name: 'test name',
        isActive: true,
        externalId: 'external test id',
        comments: 'Test comments',
        employees: undefined,
      };

      // act
      const result = mapProjectFromApiToVm(employee);

      // assert
      const expectedResult: viewModel.Project = {
        id: 'test id',
        name: 'test name',
        isActive: true,
        externalId: 'external test id',
        comments: 'Test comments',
        employees: [],
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Project Mapper - Correct Operation Test Cases', () => {
    it('should return expected result feeding correct values', () => {
      // Arrange
      const project: apiModel.Project = {
        id: 'test id',
        name: 'test name',
        isActive: true,
        externalId: 'external test id',
        comments: 'Test comments',
        employees: [
          {
            id: 'test id',
            isAssigned: true,
            employeeName: 'test employee name',
          },
        ],
      };

      // Act
      const result = mapProjectFromApiToVm(project);

      // Assert
      const expectedResult: viewModel.Project = {
        id: 'test id',
        name: 'test name',
        isActive: true,
        externalId: 'external test id',
        comments: 'Test comments',
        employees: [
          {
            id: 'test id',
            isAssigned: true,
            employeeName: 'test employee name',
          },
        ],
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
