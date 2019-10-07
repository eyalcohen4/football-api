import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useAlert } from 'react-alert';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DialogSelect({handleNoEntry, competitions, handleMenuChanges}) {
  const classes = useStyles();

  /* 
    In hoooks you probably want to sepearte your state to primitives,
    such as: 
    
    const [isOpen, setIsOpen] = React.useState(false);
    const [league, setLeague] = React.useState('');
    ...


    That's in order to later make them re-usable as a function and for performence reason, 
    since react does not need to do deep equality check inside the object 
    and cause object spreading is costly (doing {...state} everytime)

    NOT TOO CRITICAL
  */
  const [state, setState] = React.useState({
    open: false,
    league: '',
    fixtureAmount: 0,
    fixture: '',
    competitionId: 0,
    area: ''
  });
  
  const handleChangeLeague = (event) => {
    setState({...state, 
      league: event.target.value.name,
      });
     console.log('renen', state.league)
     }

  const handleChangeFixture = (event) => {
    setState({...state, fixture: event.target.value});
     }

  const handleClickOk = (event) => {
   /* @TODO Using Boolean(...) isnt a mistake, but !state.league will lead to the same result 
   // without a function call and without creating a all new variable which Boolean does.
   
   If you checking a boolean value is true or truthy, there is no need to equal it to true, 
   cause the if statment will pass anyway. these too are the same: 
   1. if (Boolean(state.league)) {} 
   2. if (Boolean(state.league) == true)

   they are evaluated as:
   1. if (true) {}
   2. if (true === true) {}
   so you can see why there is no need to check the equality

    NEVER USE == in JS no metter what, always make full equality check unless you want to cry at night 
    looking for creepy bugs
    Also again, no need for else after return
    */
    if (Boolean(state.league) == true && Boolean(state.fixture) == true) {
     return handleMenuChanges({
            league:state.league,
            fixture: state.fixture,
            competitionId: state.competitionId,
            area: state.area,
            isPrams: true,
    })} else {
      return handleMenuChanges({
        isPrams: false
      })
     }}

  const handleClickOpen = () => {
    setState({ ...state, open: true });
    // console.log('competitions', competitions)
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div style={{
      display: 'grid',
      gridColumn: '2/3',
      justifyContent: 'center',
      marginTop: '2%',
      marginBottom: '2%'
    }}>
      <Button 
      onClick={handleClickOpen}
      style={{
        backgroundColor: '#D46A6A'
      }}>Choose here!</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={state.open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">League</InputLabel>
              <Select
                value={state.league}
                onChange={handleChangeLeague}
                input={<Input id="age-native-simple" />}
              >
             {competitions.map((competition, i) => (
                  <MenuItem 
                  key={i}
                  value={{
                    name: competition.name,
                    id: competition.id,
                    area: competition.area.name
                  }}
                  >{competition.name} - {competition.area.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Fixture</InputLabel>
              <Select
                value={state.fixture}
                onChange={handleChangeFixture}
                input={<Input id="age-native-simple" />}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={3}>4</MenuItem>
                <MenuItem value={3}>5</MenuItem>
                <MenuItem value={3}>6</MenuItem>
                <MenuItem value={3}>7</MenuItem>
                <MenuItem value={3}>8</MenuItem>
                <MenuItem value={3}>9</MenuItem>
                <MenuItem value={3}>10</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
          onClick=
          {(event) => {
            handleClose(event)
            handleClickOk(event)}} 
          color="primary">
          Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 
