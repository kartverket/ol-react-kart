import React from 'react';

import { useTranslation } from 'react-i18next';

import { IProject } from '../../../MapCore/Models/config-model';
import { useProjectStore } from '../../../app/projetStore';

const ProjectsList = () => {
  const { t } = useTranslation();

  const setActiveProject = useProjectStore(state => state.setActiveProject);
  const listProjects = useProjectStore(state => state.projects);
  const showActiveProjectFromList = useProjectStore(state => state.showActiveProjectFromList);

  const toggleShowActiveProjectFromList = (project: IProject): void => {
    showActiveProjectFromList();
    setActiveProject(project.ProjectName);
  };

  return (
    <>
      <ul className="list-group list-group-flush" id="ProjectsList">
        {listProjects.map((project, index) => (
          <li
            key={index}
            className="list-group-item list-group-item-action pt-2 pb-2 text-capitalize projectlist-item"
            onClick={() => toggleShowActiveProjectFromList(project)}
          >
            <span className="material-icons-outlined me-2">{t(project.HeaderIcon)}</span>
            <label className="text-capitalize">{t(project.SiteTitle)}</label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProjectsList;
