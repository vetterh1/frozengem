import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import CheckCircle from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
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
}));

export default function ChipsArray({data, title, multipleEnabled, allEnabled, onFilterChange}) {
  const classes = useStyles();

  const [chipData, setChipData] = React.useState(data);

  const handleClick = chipSelected => () => {
    const newChips = chipData.map(chip => { 
        if(chip.key !== chipSelected.key) return multipleEnabled ? chip : {...chip, selected: false};
        return {...chip, selected: !chip.selected};
    });    
    const selected = newChips.filter(chip => chip.selected === true).map(chip => chip.key);
    setChipData(newChips);
    onFilterChange({title: selected});
  };

  const handleAll = () => {
    setChipData(chips => chips.map(chip => { 
      return {...chip, selected: true};
    }));
    const selected = chipData.map(chip => chip.key);
    onFilterChange({title: selected});
  };

  return (
    <div className={classes.root}>
        <div className={classes.title}>
            {title}:
        </div>
        {allEnabled &&
            <React.Fragment>
                <Chip
                    key={title+'_all'}
                    label={'All'}
                    onClick={handleAll}
                    className={classes.chip}
                />
                <span className={classes.divider}>|</span>
            </React.Fragment>
        }
        {chipData.map(data => {
            let icon;

            if (data.selected) {
            icon = <CheckCircle />;
            }

            return (
            <Chip
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
