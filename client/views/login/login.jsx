import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useStore } from 'state'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.2)'
    },
    paper: {
        padding: '2rem'
    },
    button: { marginTop: '1rem' }
})

const Login = () => {
    const { rootStore, authStore } = useStore()
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    if (authStore.currentUser) {
        // Redirect to dashboard if logged in
        return <Redirect to="/dashboard" />
    }

    const handleLogin = e => {
        e.preventDefault()
        Meteor.loginWithPassword(email, password, err => {
            if (err) {
                console.error(err)
            } else {
                rootStore.router.push('/dashboard')
            }
        })
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <form onSubmit={handleLogin}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography style={{ fontSize: '2.4rem' }}>Hello, world</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                fullWidth
                                onChange={e => {
                                    setEmail(e.target.value)
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                onChange={e => {
                                    setPassword(e.target.value)
                                }} />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth className={classes.button}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    )
}

export default observer(Login)
