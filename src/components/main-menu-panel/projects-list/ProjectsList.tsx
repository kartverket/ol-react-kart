import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../index';
import { selectProjectsList, showActiveProjectFromList } from './projectsListSlice';
import { useTranslation } from 'react-i18next';


const ProjectsList = () => {
  const { t } = useTranslation();

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
            {t(project.ProjectName)}
          </li>
        )}
      </ul>
    </>
  )
}

export default ProjectsList;