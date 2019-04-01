import { observer } from 'mobx-react';
import * as React from 'react';
import { ShellViewModel } from './state';
import './style.scss';
import { Icon } from '../components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Drawer, AppBar, Toolbar, IconButton, Typography, Badge, Theme } from '@material-ui/core';
import classNames from 'classnames';

import { makeStyles, useTheme } from '@material-ui/styles';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) => ({
    button1: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
}));

export const ShellView: React.SFC<{}> = (props) => {

    const [drawerState, setDrawerState] = React.useState(() => ({
        open: true,
    }));

//     const theme = useTheme<Theme>();

    const classes = useStyles();

    // return <>
    //     <CssBaseline />
    //     <Drawer
    //         anchor="left"
    //         open={drawerState.open}
    //     >
    //         Drawer Contents
    //         <Button variant="contained" onClick={() => setDrawerState({ open: false })}>Close</Button>
    //     </Drawer>
    //     <div>
    //         <Button className={classes.button1} variant="contained" onClick={() => setDrawerState({ open: true })}>Open</Button>
    //     </div>
    // </>;

    return <>
        <CssBaseline />
        <div className={classes.root}>
            <AppBar
                position="absolute"
                className={classNames(classes.appBar, drawerState.open && classes.appBarShift)}
            >
                <Toolbar disableGutters={!drawerState.open} className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={() => setDrawerState({ open: true })}
                        className={classNames(
                            classes.menuButton,
                            drawerState.open && classes.menuButtonHidden,
                        )}
                    >
                        <Icon icon="menu" />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Dashboard
          </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <Icon icon="home" />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !drawerState.open && classes.drawerPaperClose),
                }}
                open={drawerState.open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => setDrawerState({ open: false })}>
                        <Icon icon="chevron-left" />
                    </IconButton>
                </div>
                {/* <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List> */}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Typography variant="h4" gutterBottom component="h2">
                    Orders
        </Typography>
                <Typography component="div" className={classes.chartContainer}>
                    {/* <SimpleLineChart /> */}

                </Typography>
                <Typography variant="h4" gutterBottom component="h2">
                    Products
        </Typography>
                <div className={classes.tableContainer}>
                    {/* <SimpleTable /> */}
                    <pre>Table</pre>
                </div>
            </main>
        </div>
    </>;

}
