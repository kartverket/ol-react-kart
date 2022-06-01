import React, { useState } from 'react';
import { faMap, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector, useAppDispatch } from '../../../index';
import { selectProjectsList, showActiveProjectFromList } from './projectsListSlice';


const ProjectsList = () => {
  const listProjects = useAppSelector(selectProjectsList);
  const dispatch = useAppDispatch();

  const toggleShowActiveProjectFromList = (): void =>  {
    dispatch(showActiveProjectFromList());
  }

  return (
    <>      
      <ul className="list-group list-group-flush">
        {listProjects.map((project, index) => 
          <li key={index} className="list-group-item pt-2 pb-2 text-capitalize" onClick={() => toggleShowActiveProjectFromList()}>
            {project.ProjectName}
          </li>
        )}
      </ul>
    </>
  )
}

export default ProjectsList;