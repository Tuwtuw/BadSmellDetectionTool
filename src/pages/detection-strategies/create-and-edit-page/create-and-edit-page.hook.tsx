import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormTypes } from './create-and-edit-page';

function useCreateAndEditPageHook() {
  const navigate = useNavigate();

  const createDetectionStrategy = React.useCallback((formData: FormTypes) => {
    window.api.database.detectionStrategy.new(formData.name, formData.formula, formData.description);
    navigate('/strategies');
  }, []);

  const editDetectionStrategy = React.useCallback((targetId: number, formData: FormTypes) => {
    window.api.database.detectionStrategy.edit(targetId, formData.name, formData.formula, formData.description);
    navigate('/strategies');
  }, []);

  return {
    createDetectionStrategy,
    editDetectionStrategy,
  };
}

export default useCreateAndEditPageHook;
