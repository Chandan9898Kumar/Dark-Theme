import React, { memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const AccountInformationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is Account Information Page</h1>
    </div>
  );
};

export default memo(AccountInformationPage);
