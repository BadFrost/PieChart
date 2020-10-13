import React from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Container, makeStyles, Button, TextField, Typography } from '@material-ui/core';
import history from '../history';

const useStyles = makeStyles(() => ({
    header: {
        position: 'absolute',
        background: '#ffffff',
        width: '100%',
        height: '6%',
        top: '0px',
        left: '0px'
    },
    mainBtn: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        color: '#4557d1',
        width: '6%',
        height: '100%',
        left: '0%',
        borderRadius: '0px',
    },
    addBtn: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        color: '#4557d1',
        width: '6%',
        height: '100%',
        left: '6%',
        borderRadius: '0px'
    },
    sign: {
        position: 'absolute',
        width: '14%',
        height: '5%',
        top: '25%',
        right: '1%'
    },
    formContainer: {
        position: 'absolute',
        width: '40%',
        height: '75%',
        top: '17%',
        left: '30%'
    },
    formTitle: {
        position: 'absolute',
        width: '10%',
        height: '7%',
        top: '10%',
        left: '44.5%'
    },
    name: {
        position: 'absolute',
        width: '90%',
        height: '4%',
        top: '0%',
        left: '5%'
    },
    count: {
        position: 'absolute',
        width: '90%',
        height: '4%',
        top: '10%',
        left: '5%'
    },
    save: {
        position: 'absolute',
        backgroundColor: '#4557d1',
        color: '#ffffff',
        width: '30%',
        height: '7%',
        top: '25%',
        left: '35%'
    },
}));

export const Add = () => {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [name, setName] = React.useState('');
    const [count, setCount] = React.useState('');

    let saveData = () => {
        axios.post('http://localhost:3001/add', {
            name: name,
            count: count
        })
        .then(res => {
            if (!res.data.errors) {
                history.push('/');
            } else {
                for (let i = 0; i < res.data.errors.length; i++) {
                    let message = `${res.data.errors[i].msg.errorCode}: ${res.data.errors[i].msg.errorMessage}`
                    enqueueSnackbar(message, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    });
                };
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <Container>
            <Container maxWidth={false} className={classes.header}>
                <Button className={classes.mainBtn} onClick={() => history.push('/')}>MAIN</Button>
                <Button disabled={true} className={classes.addBtn}>ADD</Button>
                <Typography gutterBottom variant="h6" className={classes.sign}>by VALENTYN KUZNETSOV</Typography>
            </Container>
            <Container className={classes.formTitle}>
                <Typography gutterBottom variant="h6" align='center'>ADD DATA</Typography>
            </Container>
            <Container className={classes.formContainer}>
                <TextField className={classes.name} variant="outlined" label="Name" onChange={name => setName(name.target.value)} />
                <TextField className={classes.count} variant="outlined" label="Count" onChange={count => setCount(count.target.value)} />
                <Button className={classes.save} onClick={() => saveData()}>SAVE</Button>
            </Container>
        </Container>
    );
};