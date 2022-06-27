import React from "react"
import PropTypes from "prop-types"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { makeStyles } from "@mui/styles"
import {
  Drawer,
  Box,
  Toolbar,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  List,
  Link
} from "@mui/material"
import { useRouter } from "next/router";

const useStyles = makeStyles({
  listItemIcon: {
    margin: 3,
    padding: 10,
    height: "auto",
    maxWidth: 360,
    backgroundColor: "#142243",
    borderRadius: "23px",
    justifyContent: "center",
    alignItems: "center",
  },
  listItemIconSelected: {
    margin: 3,
    padding: 10,
    height: "auto",
    maxWidth: 360,
    backgroundColor: "#3B7AFD",
    borderRadius: "23px",
    justifyContent: "center",
    alignItems: "center",
  },
  boxBorder: {
    borderRight: "10px solid white"
  }
})

const drawerWidth = 100

export default function Sidebar(props) {
  const classes = useStyles()
  const { window, page } = props
  const router = useRouter()
  const { clubId } = router.query
  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box
      component="nav"
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      {/* Phone drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            paddingTop: "50px",
            backgroundColor: (theme) =>
              theme.palette.mode == "dark" ? "#142243" : "#F4F4F5",

          },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton component="a" onClick={e => { router.push(`/dashboard/${clubId}`, undefined, { shallow: true }) }} alignItems="center">
            <ListItemIcon className={page == 1 ? classes.listItemIconSelected : classes.listItemIcon}>
              <HomeRoundedIcon />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton component="a" onClick={e => { router.push(`/dashboard/${clubId}/proposal`, undefined, { shallow: true }) }}>
            <ListItemIcon className={page == 2 ? classes.listItemIconSelected : classes.listItemIcon}>
              <InsertDriveFileRoundedIcon />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton component="a" onClick={e => { router.push(`/dashboard/${clubId}/members`, undefined, { shallow: true }) }}>
            <ListItemIcon className={page == 3 ? classes.listItemIconSelected : classes.listItemIcon}>
              <PeopleRoundedIcon />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon className={classes.listItemIcon}>
              <CompareArrowsRoundedIcon />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton component="a" onClick={e => { router.push(`/dashboard/${clubId}/settings`, undefined, { shallow: true }) }}>
            <ListItemIcon className={classes.listItemIcon}>
              <SettingsRoundedIcon />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>

      {/* PC drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            paddingTop: "50px",
            backgroundColor: (theme) =>
              theme.palette.mode == "dark" ? "#142243" : "#F4F4F5",
          },
        }}
        open
      >
        <Toolbar />

        <List>
          <ListItemButton component="a" onClick={e => { router.push(`/dashboard/${clubId}`, undefined, { shallow: true }) }} alignItems="center">
            <ListItemIcon className={page == 1 ? classes.listItemIconSelected : classes.listItemIcon}>
              <HomeRoundedIcon />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton component="a" onClick={e => { router.push(`/dashboard/${clubId}/proposal`, undefined, { shallow: true }) }}>
            <ListItemIcon className={page == 2 ? classes.listItemIconSelected : classes.listItemIcon}>
              <InsertDriveFileRoundedIcon />
            </ListItemIcon>

          </ListItemButton>
          <ListItemButton component="a" onClick={e => { router.push(`/dashboard/${clubId}/members`, undefined, { shallow: true }) }}>
            <ListItemIcon className={page == 3 ? classes.listItemIconSelected : classes.listItemIcon}>
              <PeopleRoundedIcon />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton >
            <ListItemIcon className={classes.listItemIcon}>
              <CompareArrowsRoundedIcon />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton component="a" onClick={e => { router.push(`/dashboard/${clubId}/settings`, undefined, { shallow: true }) }}>
            <ListItemIcon className={page == 5 ? classes.listItemIconSelected : classes.listItemIcon}>
              <SettingsRoundedIcon />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  )
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}
