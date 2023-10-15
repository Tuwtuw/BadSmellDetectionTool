import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormTypes } from './create-and-edit-page';

function useCreateAndEditPageHook() {
  const navigate = useNavigate();

  const createMetric = React.useCallback((formData: FormTypes) => {
    window.api.database.metric.new(formData.name, formData.type, formData.min, formData.max, formData.description);
    navigate('/metrics');
  }, []);

  const editMetric = React.useCallback((targetId: number, formData: FormTypes) => {
    window.api.database.metric.edit(
      targetId,
      formData.name,
      formData.type,
      formData.min,
      formData.max,
      formData.description,
    );
    navigate('/metrics');
  }, []);

  return {
    createMetric,
    editMetric,
  };
}

export default useCreateAndEditPageHook;
