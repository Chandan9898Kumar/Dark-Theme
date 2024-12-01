import React, { useState, useTransition, lazy, Suspense } from 'react';
import './tabStyle.css';
const TabButtons = lazy(() => import('./TabButtons'));
const Issues = lazy(() => import('./IssueComponent'));
const Projects = lazy(() => import('./ProjectComponent'));
const Reports = lazy(() => import('./ReportComponent'));
const CompoundPattern = lazy(() => import('./CompoundPattern'));
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
    <>
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

        <div className="Tab-Content">{<Suspense fallback="Loading...">{Components[tab]}</Suspense>}</div>
      </div>
      <div>
        <CompoundPattern />
      </div>
    </>
  );
};

export default TabHome;
