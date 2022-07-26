import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../index';
import { IProject, selectProjectsList, setActiveProject, showActiveProjectFromList } from './projectsListSlice';

library.add(fas);

const ProjectsList = () => {
  const { t } = useTranslation();

  const listProjects = useAppSelector(selectProjectsList);
  const dispatch = useAppDispatch();

  const toggleShowActiveProjectFromList = (project: IProject): void => {
    dispatch(showActiveProjectFromList());
    dispatch(setActiveProject(project));
  };

  return (
    <>
      <ul className="list-group list-group-flush">
        {listProjects.map((project, index) => (
          <li
            key={index}
            className="list-group-item list-group-item-action pt-2 pb-2 text-capitalize"
            onClick={() => toggleShowActiveProjectFromList(project)}
          >
            <FontAwesomeIcon icon={project.HeaderIcon as IconName} className="me-2" />
              {t(project.ProjectName)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProjectsList;
