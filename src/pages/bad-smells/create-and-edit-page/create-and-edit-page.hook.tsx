import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormTypes } from './create-and-edit-page';

function useCreateAndEditPageHook() {
  const navigate = useNavigate();

  const createBadSmell = React.useCallback((formData: FormTypes) => {
    window.api.database.badSmell.new(formData.name, formData.scope, formData.detectionStrategy, formData.description);
    navigate('/badsmells');
  }, []);

  const editBadSmell = React.useCallback((targetId: number, formData: FormTypes) => {
    window.api.database.badSmell.edit(
      targetId,
      formData.name,
      formData.scope,
      formData.detectionStrategy,
      formData.description,
    );
    navigate('/badsmells');
  }, []);

  return {
    createBadSmell,
    editBadSmell,
  };
}

export default useCreateAndEditPageHook;
