import React from 'react';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PageHeader from './above-content/pageHeader';
import FormMenu from './above-content/formMenu';

 const gameMenuContainer = ({handleMenuChanges, competitions}) => {
  return (
    <Container 
      fluid 
      style={{ 
        marginTop: '2em',
        width: '100%' 
      }}>
      <PageHeader />
      <FormMenu
      competitions={competitions} 
      handleMenuChanges={handleMenuChanges} />
    </Container>
  );
}


export default gameMenuContainer;