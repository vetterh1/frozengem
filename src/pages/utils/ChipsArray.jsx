import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import Paper from '@material-ui/core/Paper';
import DoneAll from '@material-ui/icons/DoneAll';
import DoneOutline from '@material-ui/icons/DoneOutline';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
    alignItems: "center",
  },
  title: {
    marginRight: theme.spacing(2),
  },  
  chip: {
    margin: theme.spacing(0.5),
  },
  divider: {
    margin: theme.spacing(1.5),
  },
  iconNotSelected: {
    color: "lightgrey",
  },  
  iconLightColor: {
    color: "grey",
  },
}));

export default function ChipsArray({data, title, multipleEnabled, allEnabled, onFilterChange}) {
  const classes = useStyles();

  const [chipData, setChipData] = React.useState(data);

  const handleClick = chipSelected => () => {
    const newChips = chipData.map(chip => { 
        if(chip.key !== chipSelected.key) return multipleEnabled ? chip : {...chip, selected: false};
        return {...chip, selected: !chip.selected};
    });    
    const selectedKeys = newChips.filter(chip => chip.selected === true).map(chip => chip.key);
    setChipData(newChips);
    onFilterChange(selectedKeys);
  };

  const handleAll = () => {
    setChipData(chips => chips.map(chip => { 
      return {...chip, selected: true};
    }));
    const selectedKeys = chipData.map(chip => chip.key);
    onFilterChange(selectedKeys); 
  };

  const handleNone = () => {
    setChipData(chips => chips.map(chip => { 
      return {...chip, selected: false};
    }));
    const selectedKeys = chipData.map(chip => chip.key);
    onFilterChange(selectedKeys);
  };

  return (
    <div className={classes.root}>
        <div className={classes.title}>
            {title}:
        </div>
        {allEnabled &&
            <React.Fragment>
                <Chip
                    size="small"
                    key={title+'_all'}
                    label={'All'}
                    onClick={handleAll}
                    icon={<DoneAll className={classes.iconLightColor} style={{ fontSize: "0.8rem" }} />}
                    className={classes.chip}
                />
                <Chip
                    size="small"
                    key={title+'_none'}
                    label={'None'}
                    onClick={handleNone}
                    icon={<DoneOutline className={classes.iconLightColor} style={{ fontSize: "0.8rem" }} />}
                    className={classes.chip}
                />
                <span className={classes.divider}>|</span>
            </React.Fragment>
        }
        {chipData.map(data => {
            let icon;

            if (data.selected) {
                icon = <CheckCircle />;
            } else {
                icon = <CheckCircleOutline className={classes.iconNotSelected} />;
            }

            return (
            <Chip
                size="small"
                key={data.key}
                icon={icon}
                label={data.label}
                onClick={handleClick(data)}
                className={classes.chip}
            />
            );
        })}
    </div>
  );
}
