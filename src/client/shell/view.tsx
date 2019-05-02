import { AppBar, Badge, Button, Divider, Drawer, IconButton, List, Menu, MenuItem, Theme, Toolbar, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import * as React from 'react';
import { Icon } from '../components';
import { RightDrawer } from './rightDrawer';
import './style.scss';

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

export const ShellView: React.SFC<{}> = props => {

    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [helpOpen, setHelpOpen] = React.useState(true);
    const [ anchorEl, setAnchorEl ] = React.useState<HTMLElement | null>(null);
    const handleClose = React.useMemo(() => () => setAnchorEl(null), [setAnchorEl]);
    const accountButtonClick =
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => setAnchorEl(event.currentTarget as HTMLElement);
    const classes = useStyles();

    return <div className={classes.root}>
        <AppBar
            position="absolute"
            className={classNames(classes.appBar, drawerOpen && classes.appBarShift)}
        >
            <Toolbar disableGutters={!drawerOpen} className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={() => setDrawerOpen(true)}
                    className={classNames(
                        classes.menuButton,
                        drawerOpen && classes.menuButtonHidden,
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
                <IconButton color="inherit" onClick={accountButtonClick}>
                    <Icon icon="account" />
                </IconButton>
                <IconButton color="inherit" onClick={() => setHelpOpen(true)}>
                    <Icon icon="help" />
                </IconButton>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            classes={{
                paper: classNames(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
            }}
            open={drawerOpen}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={() => setDrawerOpen(false)}>
                    <Icon icon="chevron-left" />
                </IconButton>
            </div>
            <Divider />
            <List></List>
            <Divider />
            <List></List>
        </Drawer>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Toolbar>
                <Typography>Foo</Typography>
            </Toolbar>
            <Typography variant="h4" gutterBottom component="h2">
                Orders
            </Typography>
            <Typography component="div" className={classes.chartContainer}>
                {/* <SimpleLineChart /> */}

            </Typography>
            <Typography variant="h4" gutterBottom component="h2">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
            </Typography>
            <div className={classes.tableContainer}>
                {/* <SimpleTable /> */}
                <pre>Table</pre>
            </div>
        </main>
        <RightDrawer open={helpOpen} setOpen={setHelpOpen} />
    </div>;

};
