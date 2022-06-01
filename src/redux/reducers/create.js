import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'create',
    initialState: {
        value: null,
        clubName: null,
        clubsymbol: null,
        displayImage: null,
        raiseAmount: 0,
        maxContribution: 0,
        mandatoryProposal: false,
        voteForQuorum: 0,
        depositClose: null,
        minContribution: 0,
        voteInFavour: 0,
        daoAddress: null,
    },
    reducers: {
        addWallet: (state, action) => {
            state.value = action.payload
        },
        removeWallet: (state, action) => {
            state.value = null
        },
        addClubName: (state, action) => {
            state.clubName = action.payload
        },
        addClubsymbol: (state, action) => {
            state.clubsymbol = action.payload
        },
        addDisplayImage: (state, action) => {
            state.displayImage = action.payload
        },
        addRaiseAmount: (state, action) => {
            state.raiseAmount = action.payload
        },
        addMaxContribution: (state, action) => {
            state.maxContribution = action.payload
        },
        addMandatoryProposal: (state, action) => {
            state.mandatoryProposal = action.payload
        },
        addVoteForQuorum: (state, action) => {
            state.voteForQuorum = action.payload
        },
        addDepositClose: (state, action) => {
            state.depositClose = action.payload
        },
        addMinContribution: (state, action) => {
            state.minContribution = action.payload
        },
        addVoteInFavour: (state, action) => {
            state.voteInFavour = action.payload
        },
        addDaoAddress: (state, action) => {
            state.daoAddress = action.payload
        },
        removeDaoAddress: (state, action) => {
            state.daoAddress = null
        }

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export const { 
    addWallet, 
    removeWallet,
    addClubName,
    addClubsymbol,
    addDisplayImage,
    addRaiseAmount,
    addMaxContribution,
    addMandatoryProposal,
    addVoteForQuorum,
    addDepositClose,
    addMinContribution,
    addVoteInFavour,
    addDaoAddress,
    removeDaoAddress,
    } = slice.actions
    

export default slice.reducer