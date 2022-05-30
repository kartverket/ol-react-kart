import axios from 'axios';
import type { EventStoreDispatch } from '../Events/Event/eventStore';
import { setToken, selectProject } from './projectSlice';
import { useEventSelector } from '../../index';

export const Project = function (dispatch: EventStoreDispatch) {
  const project = useEventSelector(selectProject);
  
  return {
    generateToken() {
      console.log('GENERATE TOKEN');
      if (project) {
        axios.get(`${project?.isygatekeeper}`).then(function (response) {
          // handle success
          // console.log(response);
          dispatch(setToken(response.data));
        });
      }
    }

  }
}