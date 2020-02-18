import React, { useEffect } from 'react';
import Quagga from 'quagga';

const Scanner = ({
    onDetected
}) => {

    const [codes, setCodes] = React.useState([]);

    console.debug("Scanner init - codes=", codes);

    useEffect(() => {

        Quagga.init({
            inputStream: {
                type : "LiveStream",
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
                readers : [ "ean_reader"]
            },
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(_onDetected);

        // Cleaning
        return () => {
            Quagga && Quagga.offDetected(_onDetected);
        };        

    }, []);
    


    const _onDetected = (results) => {
        const newCode = (results && results.codeResult) ? results.codeResult.code : null;
        if(newCode) {
            setCodes(codes.concat(newCode));
            console.debug("Scanner._onDetected - newCode=", newCode, codes.length, codes);

            if(codes.length > 5) {
                onDetected(codes)
            }
        }

    };    

    return (
        <div id="interactive" className="viewport"/>
    );

};

export default Scanner;