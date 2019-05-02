import { Divider, Drawer, IconButton, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import * as React from 'react';
import { Icon } from '../components';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) => ({
    drawerPaper: {
        position: 'relative',
        // whiteSpace: 'nowrap',
        width: drawerWidth,
        // transition: theme.transitions.create('width', {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.enteringScreen,
        // }),
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
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBarSpacer: theme.mixins.toolbar,
}));

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const RightDrawer: React.SFC<Props> = props => {
    const { open: drawerOpen, setOpen: setDrawerOpen } = props;
    const classes = useStyles();

    return <Drawer
        variant="permanent"
        classes={{
            paper: classNames(classes.drawerPaper), // , !drawerOpen && classes.drawerPaperClose),
        }}
        open={drawerOpen}
        anchor="right"
    >
        <div className={classes.appBarSpacer} />
        <div className={classes.toolbarIcon}>
            <IconButton onClick={() => setDrawerOpen(false)}>
                <Icon icon="close" />
            </IconButton>
        </div>
        <Divider />
    </Drawer>;
};
