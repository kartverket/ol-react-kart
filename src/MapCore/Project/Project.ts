import axios from 'axios';
import type { EventStoreDispatch } from '../Events/Event/eventStore';
import { setToken, selectProject } from './projectSlice';
import { useEventSelector } from '../../index';

export const Project = function (dispatch: EventStoreDispatch) {
  const project = useEventSelector(selectProject);
  
  return {
    generateToken() {
      if (project) {
        axios.get(`${project?.isygatekeeper}`).then(function (response) {
          dispatch(setToken(response.data));
        });
      }
    }

  }
}