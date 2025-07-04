import React from 'react';


interface Props {
  children: React.ReactNode;
}

const AppContent: React.FC<Props> = ({ children }) => {


  return (
    <div>
      {children}
    </div>
  );
};

export default AppContent;
