import axios from 'axios';

import { useEventSelector } from '../../index';
import type { EventStoreDispatch } from '../Events/Event/eventStore';
import { selectProject, setToken } from './projectSlice';

export const Project = function (dispatch: EventStoreDispatch) {
  const project = useEventSelector(selectProject);

  return {
    generateToken() {
      if (project) {
        axios.get(`${project?.isygatekeeper}`).then(function (response) {
          dispatch(setToken(response.data));
        });
      }
    },
  };
};
