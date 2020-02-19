import React, { useEffect } from "react";
import Quagga from "quagga";

const Scanner = ({ onDetected }) => {
  const [codes, setCodes] = React.useState([]);

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
          if (codes[indexExistingObject].count > 5) {
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

  return <div id="interactive" className="viewport" />;
};

export default Scanner;
