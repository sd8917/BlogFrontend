import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import SimpleSnackbar from './../components/common/SnackBar';
import {SNACKBAR_SEVERITY} from '../constants/common/all.constants'

const Header = () => {
  const [value, setValue] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const [severity, setSeverity] = useState(SNACKBAR_SEVERITY.SUCCESS);

  //global state
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log("isLogin", isLogin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      setSeverity(SNACKBAR_SEVERITY.SUCCESS)
      setOpenSnackbar(true); 
      setSnackbarMessage("Logout Successful !" + "\n\n Bye !");
      setTimeout(() => {
        navigate("/");
        window.location.reload(); //so that user can able to logout completely.
      }, 1000); // Delay for 1 second (1000 milliseconds)
    } catch (error) {
      setSeverity(SNACKBAR_SEVERITY.ERROR)
      setOpenSnackbar(true); 
      setSnackbarMessage(error.response.data.message || error.response.statusText);
      console.log("err", error);
    }
  };

  return (
    <>
    <SimpleSnackbar 
        open={openSnackbar} 
        setOpen={setOpenSnackbar} 
        message={snackbarMessage} 
        severity={severity}
      />
      <AppBar position="sticky">
     
        <Toolbar>
          <Typography
            style={{ cursor: "pointer" }}
            variant="h4"
            onClick={() => navigate("/")}
          >
            Nomads{" "}
          </Typography>
          <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
            <Tabs textColor="white" value={value}>
               <Tab label="Home" LinkComponent={Link} to="/" />  
              <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
              {isLogin && (
                <>
                  <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                  <Tab label="Create Blog" LinkComponent={Link} to="/blog" />
                </>
              )}
            </Tabs>
          </Box>
          {!isLogin && (
            <>
              <Box display={"flex"} marginLeft="auto">
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </Box>
            </>
          )}
          {isLogin && (
            <>
              {" "}
              <Button
                sx={{ margin: 1, color: "white" }}
                LinkComponent={Link}
                to="/profile"
              >
                Profile
              </Button>
              <Button sx={{ margin: 1, color: "white" }} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

//

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Button,
//   Typography,
//   Tab,
//   Tabs,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { authActions } from "../redux/store";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// const Header = () => {
//   const [value, setValue] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);

//   //global state
//   const navigate = useNavigate();
//   const isLogin = useSelector((state) => state.auth.isLogin);
//   console.log("isLogin", isLogin);
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     try {
//       dispatch(authActions.logout());
//       alert("Logout successfully");
//       navigate("/login");
//       window.location.reload(); //so that user can able to logout completely.
//     } catch (error) {
//       console.log("err", error);
//     }
//   };

//   const handleProfileMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleProfileMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <AppBar position="sticky">
//         <Toolbar>
//           <Typography variant="h4" onClick={() => navigate("/")}>
//             ComeBlog {user.name}
//           </Typography>
//           <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
//             <Tabs textColor="white" value={value}>
//               <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
//               {isLogin && (
//                 <>
//                   <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
//                   <Tab label="Create Blog" LinkComponent={Link} to="/blog" />
//                 </>
//               )}
//             </Tabs>
//           </Box>
//           {!isLogin && (
//             <>
//               <Box display={"flex"} marginLeft="auto">
//                 <Button
//                   sx={{ margin: 1, color: "white" }}
//                   LinkComponent={Link}
//                   to="/login"
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   sx={{ margin: 1, color: "white" }}
//                   LinkComponent={Link}
//                   to="/register"
//                 >
//                   Register
//                 </Button>
//               </Box>
//             </>
//           )}
//           {isLogin && (
//             <>
//               {" "}
//               <IconButton
//                 sx={{ margin: 1, color: "white" }}
//                 onClick={handleProfileMenuClick}
//               >
//                 <AccountCircleIcon />
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleProfileMenuClose}
//               >
//                 <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </Menu>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// };

// export default Header;
