import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import axios from "axios";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


function componentDidMount() {

}

const EditLinkButton =(props) =>{
    if(props.type==="employee"){
        return(<Link to={`/edit/${props.id}`} className="btn btn-success">
            Edit
        </Link>);
    } else {
        return(<Link to={`/editsecu/${props.id}`} className="btn btn-success">
            Edit
        </Link>);
    }
}


export default function CustomizedDialogs(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const deleteFun = (id) => {
        console.log(id);
        var uri;
        if(props.type==="employee"){
            uri = "http://localhost:8081/employee/";
        }else{
            uri = "http://localhost:8081/securities/";
        }
        axios.delete(uri + id).then(result => {
            handleClose();
            props.refreshEmployee();
        });
    }


    /*const componentDidMount=() => {
        axios.get("http://localhost:8081/contacts/" + props.employeeId).then(response => {
            let data = response.data;
            let contact = {
                id: data.id,
                name: data.name,
                address: data.address,
                city: data.city,
                phone: data.phone,
                email: data.email,
                contactImage: data.contactImage
            };

        });
    }
    componentDidMount()*/
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Action
            </Button>
            <Dialog fullWidth={true}
                    maxWidth={"md"} className="paperWidthLg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Contact Details
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>

                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Contact Details</h3>
                                </div>
                                <div className="panel-body">
                                    <dl>
                                       {/* <dd>
                                            {this.props.imageUrl &&
                                            <img className="contact-image" src={this.props.imageUrl} alt="contact"/>}
                                        </dd>*/}
                                        <dt>Name:</dt>
                                        <dd>{props.contact.name}</dd>
                                        <dd>{props.contact.department &&
                                            <dd>{props.contact.firstName+' '+props.contact.lastName}</dd>}
                                        </dd>
                                        <dd>{props.contact.department &&
                                        <dt>Department:</dt>}
                                            <dd>{props.contact.department}</dd>
                                        </dd>
                                        <dd>{props.contact.laptopId &&
                                            <dt>Laptop Id:</dt>}
                                            <dd>{props.contact.laptopId}</dd>
                                        </dd>
                                        <dd>{props.contact.address &&
                                            <dt>Address:</dt>}
                                            <dd>{props.contact.address}</dd>
                                        </dd>

                                            <dd>{props.contact.location &&
                                            <dt>Location:</dt>}
                                                <dd>{props.contact.location}</dd>
                                            </dd>
                                        <dd>{props.contact.buildingNo &&
                                            <dt>Building No:</dt>}
                                            <dd>{props.contact.buildingNo}</dd>
                                        </dd>
                                        <dt>Phone Number:</dt>
                                        <dd>{props.contact.phone}</dd>
                                        <dt>Email Address:</dt>
                                        <dd>{props.contact.email}</dd>
                                    </dl>
                                    {localStorage.getItem("role") === "admin" ?
                                        <div><EditLinkButton id={props.contact.id} type={props.type} />

                                        &nbsp;
                                        <button onClick={deleteFun.bind(this, props.contact.id)}
                                        className="btn btn-danger">
                                        Delete
                                        </button></div>
                                        : null    }

                                </div>
                            </div>
                        </div>
                    </Typography>

                </DialogContent>

            </Dialog>
        </div>
    );
}
