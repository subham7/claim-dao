import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAccountCenter, useConnectWallet } from "@web3-onboard/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import { addWalletAddress } from "../redux/reducers/user";
import store from "../redux/store";
import { connectWallet, onboard, setUserChain } from "../utils/wallet";
import AccountButton from "./accountbutton";

// import "../../styles/globals.css";

const useStyles = makeStyles({
  image: {
    height: "30px",
    width: "auto !important",
  },
});

export default function Navbar3(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  if (wallet) {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
  }
  useEffect(() => {
    if (wallet) {
      dispatch(addWalletAddress(wallet ? wallet.accounts[0].address : null));
    }
  }, [dispatch, wallet]);

  const handleFaucetRedirect = () => {
    window.open("/faucet", "_ blank");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
          {props.faucet ? (
            <Button
              variant="primary"
              color="primary"
              sx={{ mr: 40, mt: 2 }}
              onClick={handleFaucetRedirect}
            >
              USDC Faucet
            </Button>
          ) : null}
          {connecting ? (
            <Button sx={{ mr: 2, mt: 2 }} className={classes.navButton}>
              Connecting
            </Button>
          ) : wallet ? (
            <></>
          ) : (
            <Button
              sx={{ mr: 2, mt: 2 }}
              className={classes.navButton}
              onClick={() => (wallet ? disconnect(wallet) : connect())}
            >
              Connect wallet
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
