import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import DialogContent from "@material-ui/core/DialogContent";
import CreateEmployee from "./CreateEmployee";
import {withStyles} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Create from "./Create";


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
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
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


export default function EditEmployeeDialogs(props) {

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        props.refreshEmployee();
    };



    return (
        <section>
            {/*<label variant="outlined" color="primary" onClick={handleClickOpen}> Action</label>*/}
            <a href={"#"} className="btn btn-success" onClick={handleClickOpen}> Edit</a>
            <Dialog fullWidth={true}
                    maxWidth={"md"} onClose={handleClose} aria-labelledby="max-width-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Employee
                </DialogTitle>
                <DialogContent dividers>
                    <Typography  component="span" >
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <Create employee={props.employee}/>
                                </div>
                            </div>
                        </div>
                        {/*<CreateEmployee handleClose = {handleClose}/>*/}
                    </Typography>

                </DialogContent>

            </Dialog>
        </section>
    );
}