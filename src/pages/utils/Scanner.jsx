import React, { useEffect } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Quagga from "quagga";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


const MAX = 5;
const normalise = value => (value * 100) / MAX;

const Scanner = ({ onDetected }) => {
  const classes = useStyles();
  const [codes, setCodes] = React.useState([]);
  const [steps, setSteps] = React.useState(0);

  console.debug("Scanner init - codes=", codes);

  useEffect(() => {
    console.debug("Scanner useEffect - codes=", codes);

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment" // or user
          }
        },
        locator: {
          patchSize: "large",
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          readers: ["ean_reader"]
        },
        locate: true
      },
      function(err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);

    // Cleaning
    return () => {
      console.debug("Scanner useEffect cleaning - codes=", codes);
      Quagga && Quagga.offDetected(_onDetected);
    };
  }, []);

  const _onDetected = results => {
    const newCode =
      results && results.codeResult ? results.codeResult.code : null;
    if (newCode) {
      setCodes(codes => {
        const indexExistingObject = codes.findIndex(
          codeObject => codeObject.code === newCode
        );
        let newCodes = [];
        if (indexExistingObject !== -1) {
          // This code already exists in array
          console.debug(
            "Scanner._onDetected - already exist = ",
            newCode,
            indexExistingObject,
            codes[indexExistingObject]
          );
          if (codes[indexExistingObject].count >= MAX) {
            // We have enough data, let's return this to the parent
            console.debug(
              "Scanner._onDetected - returns code, indexExistingObject = ",
              codes,
              codes[indexExistingObject],
              indexExistingObject
            );
            onDetected(codes[indexExistingObject].code);
          } else {
            // Not enough data, add to array
            newCodes = codes.map(codeObject =>
              codeObject.code === newCode
                ? { code: codeObject.code, count: codeObject.count + 1 }
                : codeObject
            );
            // And update the steps
            setSteps(oldStep => oldStep < codes[indexExistingObject].count ? oldStep + 1 : oldStep)
          }
        } else {
          // New code to add in array
          console.debug("Scanner._onDetected - does not exist ", newCode);
          newCodes = [...codes, { code: newCode, count: 1 }];
        }

        return newCodes;
      });
    }
  };

  return (
    <div className={classes.root}>
      {steps}
      <LinearProgress variant="determinate" value={normalise(steps)} />
      <div id="interactive" className="viewport" />
    </div>
  );
};

export default Scanner;
