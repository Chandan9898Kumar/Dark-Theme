import React, { useState, useTransition } from 'react';
import TabButtons from './TabButtons';
import Issues from './IssueComponent';
import Projects from './ProjectComponent';
import Reports from './ReportComponent';
import './tabStyle.css';
const TabHome = () => {
  const [tab, setTab] = useState('issues');

  const [isPending, startTransition] = useTransition();

  const handleClick = (tabType) => {
    startTransition(() => {
      setTab(tabType);
    });
  };

  const Components = {
    issues: <Issues />,
    projects: <Projects />,
    reports: <Reports />,
  };

  return (
    <div className="Tab-Container">
      <div className="Tab-Children">
        <TabButtons
          key="Issues"
          name="Issues"
          isPending={isPending}
          onClick={() => handleClick('issues')}
          isActive={tab === 'issues'}
        />
        <TabButtons
          key="Projects"
          name="Projects"
          isPending={isPending}
          onClick={() => handleClick('projects')}
          isActive={tab === 'projects'}
        />
        <TabButtons
          key="reports"
          name="Reports"
          isPending={isPending}
          onClick={() => handleClick('reports')}
          isActive={tab === 'reports'}
        />
      </div>

      <div className="Tab-Content">{Components[tab]}</div>
    </div>
  );
};

export default TabHome;
