import FlexibleStrategy from 'component/feature/StrategyTypes/FlexibleStrategy/FlexibleStrategy';
import { makeStyles } from 'tss-react/mui';
import { f } from 'vitest/dist/index-ea17aa0c';

export const useStyles = makeStyles()(theme => ({
    footer: {
        width: '100%',
        flexGrow: 1,
        zIndex: 100,
        backgroundColor: theme.palette.footerBackground,
        position: 'relative',
        boxShadow: 'none'
       
    },
    container: {
        display: 'flex',
        paddingLeft: '24px',
        paddingRight: '24px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '0px',
        maxWidth: '1450px'
    },
    gridItem:{
        paddingLeft: '80px',
        paddingRight: '80px'
    },
    list: {
        padding: 0,
        margin: 0,
    },
    logo: {
        width: '150px',
    },
    listItem: {
        padding: 0,
        margin: 0,
        '& a': {
            textDecoration: 'none',
            color: theme.palette.text.primary,
        },
    },
}));
