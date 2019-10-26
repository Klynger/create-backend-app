import React from 'react';
import { Container } from '@material-ui/core';
import ApplicationBar from '../ApplicationBar';
import ProjectSpecForm from '../ProjectSpecForm';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  contentContainer: {
    backgroundColor: 'inherit',
    display: 'flex',
    width: '100%',
  },
  mainContainer: {
    alignItems: 'center',
    backgroundColor: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 70,
  },
  root: {
    alignItems: 'center',
    backgroundColor: 'inherit',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
  },
});

const theme = createMuiTheme({});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.contentContainer}>
          <ApplicationBar />
          <Container
            maxWidth="sm"
            component="main"
            className={classes.mainContainer}
          >
            <ProjectSpecForm />
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
