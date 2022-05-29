import React, { useState } from 'react';
import { faMap, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../index';
import { selectProjectsList } from './projectsListSlice';


const ProjectsList = () => {
  const listProjects = useAppSelector(selectProjectsList);
  return (
    <>      
      <ul className="list-group list-group-flush">
        {listProjects.projects.map((project, index) => 
          <li key={index} className="list-group-item pt-2 pb-2 text-capitalize">
            {project.ProjectName}
          </li>
        )}
      </ul>
    </>
  )
}

export default ProjectsList;