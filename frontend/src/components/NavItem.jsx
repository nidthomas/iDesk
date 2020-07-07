import React, { Component } from "react";
import "./../App.css";
import { withRouter } from 'react-router-dom'
import "./NavItem.css";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/PersonAddOutlined';
import AddIconSecurity from '@material-ui/icons/SecurityOutlined';
import Home from '@material-ui/icons/Home';
import Exit from '@material-ui/icons/ExitToAppSharp';


class NavItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    onClick = e => {
        console.log("user is logging out");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        this.props.history.push("/login");
    };

    onButtonClick(e, url) {
        this.props.history.push(url);
    }

    render() {
        return (
            <div style={{maxWidth:'100%'}}>
                <AppBar position="static" style={{ backgroundColor: '#0d3c5c', maxWidth:'100%'}}>
                    <Toolbar>
                        <div style={{maxWidth:'100%'}}>
                            <Button
                                startIcon={<Home />}
                                style={{color: "white", maxWidth:'100%'}}
                                onClick={e => this.onButtonClick(e, '/')}
                            >
                                Dashboard
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {localStorage.getItem("role") === "admin" ?
                                <Button
                                    color="default"
                                    startIcon={<AddIcon />}
                                    style={{color: "white", maxWidth:'100%'}}
                                    onClick={e => this.onButtonClick(e, '/create')}
                                >
                                    Add Employee
                                </Button>
                                : null    }
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {localStorage.getItem("role") === "admin" ?
                                <Button
                                    color="default"
                                    startIcon={<AddIconSecurity />}
                                    style={{color: "white", maxWidth:'100%'}}
                                    onClick={e => this.onButtonClick(e, '/security')}
                                >
                                    Add Security
                                </Button>
                                : null    }
                        </div>
                        <div style={{maxWidth:'100%', marginLeft: "auto", marginRight: "0"}}>
                            <a> <AccountCircleIcon />{localStorage.getItem("username")} </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Tooltip title="Sign Out" placement="top">
                                <IconButton
                                    aria-label="signout"
                                    onClick={this.onClick}
                                    style={{color: "white"}}
                                >
                                    <Exit />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>

        );
    }
}

export default withRouter(NavItem);
