import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormTypes } from './create-and-edit-page';
import { Metric } from '../../../logic/types';

function useCreateAndEditPageHook() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = React.useState<Metric[]>(undefined);

  React.useEffect(() => {
    window.api.database.metric.fetchAll().then(
      (data) => {
        setMetrics(data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  const createDetectionStrategy = React.useCallback((formData: FormTypes) => {
    window.api.database.detectionStrategy.new(formData.name, formData.formula, formData.description);
    navigate('/strategies');
  }, []);

  const editDetectionStrategy = React.useCallback((targetId: number, formData: FormTypes) => {
    window.api.database.detectionStrategy.edit(targetId, formData.name, formData.formula, formData.description);
    navigate('/strategies');
  }, []);

  const metricsList = React.useMemo(() => {
    return metrics?.map((metric) => {
      return {
        value: metric.metric_id,
        metric: metric,
        label: metric.name,
      };
    });
  }, [metrics]);

  return {
    createDetectionStrategy,
    editDetectionStrategy,
    metricsList,
  };
}

export default useCreateAndEditPageHook;
