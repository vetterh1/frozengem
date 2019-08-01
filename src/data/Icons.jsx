import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import Fastfood from '@material-ui/icons/Fastfood';
import Kitchen from '@material-ui/icons/Kitchen';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Remove from '@material-ui/icons/Remove';
import Room from '@material-ui/icons/Room';
import VerticalAlignBottom from '@material-ui/icons/VerticalAlignBottom';


export const getIcon = (iconName) => icons[iconName];



const icons = {

    "categoryB": <IconCategoryBread fontSize="default" />,
    "categoryV": <IconCategoryVegetable fontSize="default" />,
    "categoryF": <IconCategoryFruit fontSize="default" />,
    "categoryS": <IconCategorySoup fontSize="default" />,
    "categoryP": <Fastfood fontSize="default" />,
    "categoryM": <IconCategoryMeat fontSize="default" />,
    "categoryH": <IconCategoryFish fontSize="default" />,
    "categoryD": <IconCategoryDesert fontSize="default" />,
    "categoryI": <IconCategoryIcecream fontSize="default" />,

    "detailsDHOM": <IconDetailsHomemade fontSize="default" />,
    "detailsDCOO": <IconDetailsCooked fontSize="default" />,
    "detailsDRAW": <IcondetailsRaw fontSize="default" />,
    "detailsDCAK": <IconCategoryDesert fontSize="default" />,
    "detailsDPIE": <IcondetailsPie fontSize="default" />,
    "detailsDFIS": <IconCategoryFish fontSize="default" />,
    "detailsDVEG": <IconCategoryVegetable fontSize="default" />,
    "detailsDCER": <IconDetailsBrownBread fontSize="default" />,
    
    "containerDefault": <IconContainerDefault fontSize="default" />,
    "colorT": <IconContainerColorTransparent fontSize="default" />,
    "colorW": <IconContainerColorWhite fontSize="default" />,
    "colorB": <IconContainerColorBlue fontSize="default" />,
    "colorG": <IconContainerColorGreen fontSize="default" />,
    "colorR": <IconContainerColorRed fontSize="default" />,
    "colorN": <IconContainerColorBrown fontSize="default" />,
    "colorO": <IconContainerColorOther fontSize="default" />,

    "sizeDefault": <IconContainerDefault fontSize="default" />,
    "size1": <IconSize1 fontSize="default" />,
    "size2": <IconSize2 fontSize="default" />,
    "size4": <IconSize4 fontSize="default" />,
    "size6": <IconContainerDefault fontSize="default" />,
    
    "freezerDefault": <Room fontSize="default" />,
    "freezerK": <Kitchen fontSize="default" />,
    "freezerB": <VerticalAlignBottom fontSize="default" />,

    "locationT": <ExpandLess fontSize="default" />,
    "locationM": <Remove fontSize="default" />,
    "locationB": <ExpandMore fontSize="default" />,
}



function IcondetailsPie(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 544 512" 
            style={{enableBackground:"new 0 0 544 512"}} 
            xmlSpace="preserve" >
            <path 
                d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"
            />
        </SvgIcon>
    );
}
            
    
    
function IconDetailsHomemade(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 576 512" 
            style={{enableBackground:"new 0 0 576 512"}} 
            xmlSpace="preserve" >
            <path 
                d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
            />
        </SvgIcon>
        );
}
    

function IconDetailsCooked(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 384 512" 
            style={{enableBackground:"new 0 0 384 512"}} 
            xmlSpace="preserve" >
            <path 
                d="M192 0C79.7 101.3 0 220.9 0 300.5 0 425 79 512 192 512s192-87 192-211.5c0-79.9-80.2-199.6-192-300.5zm0 448c-56.5 0-96-39-96-94.8 0-13.5 4.6-61.5 96-161.2 91.4 99.7 96 147.7 96 161.2 0 55.8-39.5 94.8-96 94.8z"
            />
        </SvgIcon>
        );
}
    

function IcondetailsRaw(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 448 512" 
            style={{enableBackground:"new 0 0 448 512"}} 
            xmlSpace="preserve" >
            <path 
                d="M440.3 345.2l-33.8-19.5 26-7c8.2-2.2 13.1-10.7 10.9-18.9l-4-14.9c-2.2-8.2-10.7-13.1-18.9-10.9l-70.8 19-63.9-37 63.8-36.9 70.8 19c8.2 2.2 16.7-2.7 18.9-10.9l4-14.9c2.2-8.2-2.7-16.7-10.9-18.9l-26-7 33.8-19.5c7.4-4.3 9.9-13.7 5.7-21.1L430.4 119c-4.3-7.4-13.7-9.9-21.1-5.7l-33.8 19.5 7-26c2.2-8.2-2.7-16.7-10.9-18.9l-14.9-4c-8.2-2.2-16.7 2.7-18.9 10.9l-19 70.8-62.8 36.2v-77.5l53.7-53.7c6.2-6.2 6.2-16.4 0-22.6l-11.3-11.3c-6.2-6.2-16.4-6.2-22.6 0L256 56.4V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v40.4l-19.7-19.7c-6.2-6.2-16.4-6.2-22.6 0L138.3 48c-6.3 6.2-6.3 16.4 0 22.6l53.7 53.7v77.5l-62.8-36.2-19-70.8c-2.2-8.2-10.7-13.1-18.9-10.9l-14.9 4c-8.2 2.2-13.1 10.7-10.9 18.9l7 26-33.8-19.5c-7.4-4.3-16.8-1.7-21.1 5.7L2.1 145.7c-4.3 7.4-1.7 16.8 5.7 21.1l33.8 19.5-26 7c-8.3 2.2-13.2 10.7-11 19l4 14.9c2.2 8.2 10.7 13.1 18.9 10.9l70.8-19 63.8 36.9-63.8 36.9-70.8-19c-8.2-2.2-16.7 2.7-18.9 10.9l-4 14.9c-2.2 8.2 2.7 16.7 10.9 18.9l26 7-33.8 19.6c-7.4 4.3-9.9 13.7-5.7 21.1l15.5 26.8c4.3 7.4 13.7 9.9 21.1 5.7l33.8-19.5-7 26c-2.2 8.2 2.7 16.7 10.9 18.9l14.9 4c8.2 2.2 16.7-2.7 18.9-10.9l19-70.8 62.8-36.2v77.5l-53.7 53.7c-6.3 6.2-6.3 16.4 0 22.6l11.3 11.3c6.2 6.2 16.4 6.2 22.6 0l19.7-19.7V496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-40.4l19.7 19.7c6.2 6.2 16.4 6.2 22.6 0l11.3-11.3c6.2-6.2 6.2-16.4 0-22.6L256 387.7v-77.5l62.8 36.2 19 70.8c2.2 8.2 10.7 13.1 18.9 10.9l14.9-4c8.2-2.2 13.1-10.7 10.9-18.9l-7-26 33.8 19.5c7.4 4.3 16.8 1.7 21.1-5.7l15.5-26.8c4.3-7.3 1.8-16.8-5.6-21z"
            />
        </SvgIcon>
        );
}
        



function IconDetailsBrownBread(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 576 512" 
            style={{enableBackground:"new 0 0 576 512"}} 
            xmlSpace="preserve" >
            <path 
                fill="#af5e11" 
                d="M288 0C108 0 0 93.4 0 169.14 0 199.44 24.24 224 64 224v256c0 17.67 16.12 32 36 32h376c19.88 0 36-14.33 36-32V224c39.76 0 64-24.56 64-54.86C576 93.4 468 0 288 0z"
            />
        </SvgIcon>
        );
    }
    










function IconCategoryBread(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 576 512" 
            style={{enableBackground:"new 0 0 576 512"}} 
            xmlSpace="preserve" >
            <path 
                d="M288 0C108 0 0 93.4 0 169.14 0 199.44 24.24 224 64 224v256c0 17.67 16.12 32 36 32h376c19.88 0 36-14.33 36-32V224c39.76 0 64-24.56 64-54.86C576 93.4 468 0 288 0z"
            />
        </SvgIcon>
        );
    }
    




function IconCategoryVegetable(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                d="M298.2 156.6c-52.7-25.7-114.5-10.5-150.2 32.8l55.2 55.2c6.3 6.3 6.3 16.4 0 22.6-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7L130.4 217 2.3 479.7c-2.9 6-3.1 13.3 0 19.7 5.4 11.1 18.9 15.7 30 10.3l133.6-65.2-49.2-49.2c-6.3-6.2-6.3-16.4 0-22.6 6.3-6.2 16.4-6.2 22.6 0l57 57 102-49.8c24-11.7 44.5-31.3 57.1-57.1 30.1-61.7 4.5-136.1-57.2-166.2zm92.1-34.9C409.8 81 399.7 32.9 360 0c-50.3 41.7-52.5 107.5-7.9 151.9l8 8c44.4 44.6 110.3 42.4 151.9-7.9-32.9-39.7-81-49.8-121.7-30.3z"
            />
        </SvgIcon>
        );
    }
    





    function IconCategoryFruit(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 448 512" 
            style={{enableBackground:"new 0 0 448 512"}} 
            xmlSpace="preserve" >
            <path 
                d="M350.85 129c25.97 4.67 47.27 18.67 63.92 42 14.65 20.67 24.64 46.67 29.96 78 4.67 28.67 4.32 57.33-1 86-7.99 47.33-23.97 87-47.94 119-28.64 38.67-64.59 58-107.87 58-10.66 0-22.3-3.33-34.96-10-8.66-5.33-18.31-8-28.97-8s-20.3 2.67-28.97 8c-12.66 6.67-24.3 10-34.96 10-43.28 0-79.23-19.33-107.87-58-23.97-32-39.95-71.67-47.94-119-5.32-28.67-5.67-57.33-1-86 5.32-31.33 15.31-57.33 29.96-78 16.65-23.33 37.95-37.33 63.92-42 15.98-2.67 37.95-.33 65.92 7 23.97 6.67 44.28 14.67 60.93 24 16.65-9.33 36.96-17.33 60.93-24 27.98-7.33 49.96-9.67 65.94-7zm-54.94-41c-9.32 8.67-21.65 15-36.96 19-10.66 3.33-22.3 5-34.96 5l-14.98-1c-1.33-9.33-1.33-20 0-32 2.67-24 10.32-42.33 22.97-55 9.32-8.67 21.65-15 36.96-19 10.66-3.33 22.3-5 34.96-5l14.98 1 1 15c0 12.67-1.67 24.33-4.99 35-3.99 15.33-10.31 27.67-18.98 37z"
            />
        </SvgIcon>
        );
    }
    






function IconCategorySoup(props) {
    return (
        <SvgIcon {...props} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 50.946 50.946" style={{enableBackground:"new 0 0 50.946 50.946"}} xmlSpace="preserve" >
            <path d="M50.946,15.737c0-3.396-11.405-6.149-25.473-6.149S0,12.341,0,15.737c0,0.05,0,0.149,0,0.149
                c0,14.068,11.405,25.473,25.473,25.473s25.473-11.405,25.473-25.473C50.946,15.885,50.946,15.786,50.946,15.737z"/>
            <ellipse cx="25.473" cy="15.736" rx="25.473" ry="6.149"/>
          </SvgIcon>
        );
      }
    



function IconCategoryMeat(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                d="M462.8 49.57a169.44 169.44 0 0 0-239.5 0C187.82 85 160.13 128 160.13 192v85.83l-40.62 40.59c-9.7 9.69-24 11.07-36.78 6a60.33 60.33 0 0 0-65 98.72C33 438.39 54.24 442.7 73.85 438.21c-4.5 19.6-.18 40.83 15.1 56.1a60.35 60.35 0 0 0 98.8-65c-5.09-12.73-3.72-27 6-36.75L234.36 352h85.89a187.87 187.87 0 0 0 61.89-10c-39.64-43.89-39.83-110.23 1.05-151.07 34.38-34.36 86.76-39.46 128.74-16.8 1.3-44.96-14.81-90.28-49.13-124.56z"
            />
        </SvgIcon>
        );
    }
        
    


function IconCategoryFish(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 576 512" 
            style={{enableBackground:"new 0 0 576 512"}} 
            xmlSpace="preserve" >
            <path 
                d="M327.1 96c-89.97 0-168.54 54.77-212.27 101.63L27.5 131.58c-12.13-9.18-30.24.6-27.14 14.66L24.54 256 .35 365.77c-3.1 14.06 15.01 23.83 27.14 14.66l87.33-66.05C158.55 361.23 237.13 416 327.1 416 464.56 416 576 288 576 256S464.56 96 327.1 96zm87.43 184c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24 13.26 0 24 10.74 24 24 0 13.25-10.75 24-24 24z"
            />
        </SvgIcon>
        );
    }
    






function IconCategoryDesert(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 448 512" 
            style={{enableBackground:"new 0 0 448 512"}} 
            xmlSpace="preserve" >
            <path 
                d="M448 384c-28.02 0-31.26-32-74.5-32-43.43 0-46.825 32-74.75 32-27.695 0-31.454-32-74.75-32-42.842 0-47.218 32-74.5 32-28.148 0-31.202-32-74.75-32-43.547 0-46.653 32-74.75 32v-80c0-26.5 21.5-48 48-48h16V112h64v144h64V112h64v144h64V112h64v144h16c26.5 0 48 21.5 48 48v80zm0 128H0v-96c43.356 0 46.767-32 74.75-32 27.951 0 31.253 32 74.75 32 42.843 0 47.217-32 74.5-32 28.148 0 31.201 32 74.75 32 43.357 0 46.767-32 74.75-32 27.488 0 31.252 32 74.5 32v96zM96 96c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40z"
            />
        </SvgIcon>
        );
    }
    
    




function IconCategoryIcecream(props) {
        return (
            <SvgIcon 
                {...props} 
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                x="0px" 
                y="0px"
                viewBox="0 0 448 512" 
                style={{enableBackground:"new 0 0 448 512"}} 
                xmlSpace="preserve" >
                <path 
                    d="M368 160h-.94a144 144 0 1 0-286.12 0H80a48 48 0 0 0 0 96h288a48 48 0 0 0 0-96zM195.38 493.69a31.52 31.52 0 0 0 57.24 0L352 288H96z"
                />
            </SvgIcon>
            );
        }







function IconContainerDefault(props) {
        return (
            <SvgIcon 
                {...props} 
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                x="0px" 
                y="0px"
                viewBox="0 0 512 512" 
                style={{enableBackground:"new 0 0 512 512"}} 
                xmlSpace="preserve" >
                <path 
                    d=" M 86.77 49 C 58.881 49 35.865 68.708 36.001 92.731 L 36.001 384.269 C 36.001 408.292 58.881 428 86.77 428 L 425.231 428 C 453.12 428 476 408.292 476 384.269 L 476 92.731 C 476 68.708 453.12 49 425.231 49 L 86.77 49 Z  M 86.77 78.154 L 425.231 78.154 C 434.742 78.154 442.154 84.539 442.154 92.731 L 442.154 136.462 L 69.847 136.462 L 69.847 92.731 C 69.847 84.539 77.124 78.154 86.77 78.154 Z  M 69.847 165.615 L 442.154 165.615 L 442.154 384.269 C 442.154 392.461 434.742 398.846 425.231 398.846 L 86.77 398.846 C 82.256 398.918 77.903 397.405 74.711 394.656 C 71.519 391.907 69.763 388.157 69.847 384.269 L 69.847 165.615 Z "
                />
            </SvgIcon>
            );
        }
        
        

function IconContainerColorTransparent(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                fill="#CECECE" 
                d=" M 86.77 49 C 58.881 49 35.865 68.708 36.001 92.731 L 36.001 384.269 C 36.001 408.292 58.881 428 86.77 428 L 425.231 428 C 453.12 428 476 408.292 476 384.269 L 476 92.731 C 476 68.708 453.12 49 425.231 49 L 86.77 49 Z  M 86.77 78.154 L 425.231 78.154 C 434.742 78.154 442.154 84.539 442.154 92.731 L 442.154 136.462 L 69.847 136.462 L 69.847 92.731 C 69.847 84.539 77.124 78.154 86.77 78.154 Z  M 69.847 165.615 L 442.154 165.615 L 442.154 384.269 C 442.154 392.461 434.742 398.846 425.231 398.846 L 86.77 398.846 C 82.256 398.918 77.903 397.405 74.711 394.656 C 71.519 391.907 69.763 388.157 69.847 384.269 L 69.847 165.615 Z "
            />
        </SvgIcon>
        );
    }
    
            

function IconContainerColorWhite(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                fill="#939393" 
                d=" M 86.77 49 C 58.881 49 35.865 68.708 36.001 92.731 L 36.001 384.269 C 36.001 408.292 58.881 428 86.77 428 L 425.231 428 C 453.12 428 476 408.292 476 384.269 L 476 92.731 C 476 68.708 453.12 49 425.231 49 L 86.77 49 Z  M 86.77 78.154 L 425.231 78.154 C 434.742 78.154 442.154 84.539 442.154 92.731 L 442.154 136.462 L 69.847 136.462 L 69.847 92.731 C 69.847 84.539 77.124 78.154 86.77 78.154 Z  M 69.847 165.615 L 442.154 165.615 L 442.154 384.269 C 442.154 392.461 434.742 398.846 425.231 398.846 L 86.77 398.846 C 82.256 398.918 77.903 397.405 74.711 394.656 C 71.519 391.907 69.763 388.157 69.847 384.269 L 69.847 165.615 Z "
            />
        </SvgIcon>
        );
    }

                
    
function IconContainerColorBlue(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                fill="#002D97" 
                d=" M 86.77 49 C 58.881 49 35.865 68.708 36.001 92.731 L 36.001 384.269 C 36.001 408.292 58.881 428 86.77 428 L 425.231 428 C 453.12 428 476 408.292 476 384.269 L 476 92.731 C 476 68.708 453.12 49 425.231 49 L 86.77 49 Z  M 86.77 78.154 L 425.231 78.154 C 434.742 78.154 442.154 84.539 442.154 92.731 L 442.154 136.462 L 69.847 136.462 L 69.847 92.731 C 69.847 84.539 77.124 78.154 86.77 78.154 Z  M 69.847 165.615 L 442.154 165.615 L 442.154 384.269 C 442.154 392.461 434.742 398.846 425.231 398.846 L 86.77 398.846 C 82.256 398.918 77.903 397.405 74.711 394.656 C 71.519 391.907 69.763 388.157 69.847 384.269 L 69.847 165.615 Z "
            />
        </SvgIcon>
        );
    }
              
                    

function IconContainerColorGreen(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                fill="#00751F" 
                d=" M 86.77 49 C 58.881 49 35.865 68.708 36.001 92.731 L 36.001 384.269 C 36.001 408.292 58.881 428 86.77 428 L 425.231 428 C 453.12 428 476 408.292 476 384.269 L 476 92.731 C 476 68.708 453.12 49 425.231 49 L 86.77 49 Z  M 86.77 78.154 L 425.231 78.154 C 434.742 78.154 442.154 84.539 442.154 92.731 L 442.154 136.462 L 69.847 136.462 L 69.847 92.731 C 69.847 84.539 77.124 78.154 86.77 78.154 Z  M 69.847 165.615 L 442.154 165.615 L 442.154 384.269 C 442.154 392.461 434.742 398.846 425.231 398.846 L 86.77 398.846 C 82.256 398.918 77.903 397.405 74.711 394.656 C 71.519 391.907 69.763 388.157 69.847 384.269 L 69.847 165.615 Z "
            />
        </SvgIcon>
        );
    }
          
            

function IconContainerColorRed(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                fill="#B70000" 
                d=" M 86.77 49 C 58.881 49 35.865 68.708 36.001 92.731 L 36.001 384.269 C 36.001 408.292 58.881 428 86.77 428 L 425.231 428 C 453.12 428 476 408.292 476 384.269 L 476 92.731 C 476 68.708 453.12 49 425.231 49 L 86.77 49 Z  M 86.77 78.154 L 425.231 78.154 C 434.742 78.154 442.154 84.539 442.154 92.731 L 442.154 136.462 L 69.847 136.462 L 69.847 92.731 C 69.847 84.539 77.124 78.154 86.77 78.154 Z  M 69.847 165.615 L 442.154 165.615 L 442.154 384.269 C 442.154 392.461 434.742 398.846 425.231 398.846 L 86.77 398.846 C 82.256 398.918 77.903 397.405 74.711 394.656 C 71.519 391.907 69.763 388.157 69.847 384.269 L 69.847 165.615 Z "
            />
        </SvgIcon>
        );
    }
          

function IconContainerColorBrown(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                fill="#885800" 
                d=" M 86.77 49 C 58.881 49 35.865 68.708 36.001 92.731 L 36.001 384.269 C 36.001 408.292 58.881 428 86.77 428 L 425.231 428 C 453.12 428 476 408.292 476 384.269 L 476 92.731 C 476 68.708 453.12 49 425.231 49 L 86.77 49 Z  M 86.77 78.154 L 425.231 78.154 C 434.742 78.154 442.154 84.539 442.154 92.731 L 442.154 136.462 L 69.847 136.462 L 69.847 92.731 C 69.847 84.539 77.124 78.154 86.77 78.154 Z  M 69.847 165.615 L 442.154 165.615 L 442.154 384.269 C 442.154 392.461 434.742 398.846 425.231 398.846 L 86.77 398.846 C 82.256 398.918 77.903 397.405 74.711 394.656 C 71.519 391.907 69.763 388.157 69.847 384.269 L 69.847 165.615 Z "
            />
        </SvgIcon>
        );
    }          

function IconContainerColorOther(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                fill="#000000" 
                d=" M 86.77 49 C 58.881 49 35.865 68.708 36.001 92.731 L 36.001 384.269 C 36.001 408.292 58.881 428 86.77 428 L 425.231 428 C 453.12 428 476 408.292 476 384.269 L 476 92.731 C 476 68.708 453.12 49 425.231 49 L 86.77 49 Z  M 86.77 78.154 L 425.231 78.154 C 434.742 78.154 442.154 84.539 442.154 92.731 L 442.154 136.462 L 69.847 136.462 L 69.847 92.731 C 69.847 84.539 77.124 78.154 86.77 78.154 Z  M 69.847 165.615 L 442.154 165.615 L 442.154 384.269 C 442.154 392.461 434.742 398.846 425.231 398.846 L 86.77 398.846 C 82.256 398.918 77.903 397.405 74.711 394.656 C 71.519 391.907 69.763 388.157 69.847 384.269 L 69.847 165.615 Z "
            />
        </SvgIcon>
        );
    }
         
    






function IconSize1(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                d=" M 175.844 159 C 162.746 159 151.937 168.256 152 179.538 L 152 316.462 C 152 327.744 162.746 337 175.844 337 L 334.805 337 C 347.903 337 358.649 327.744 358.649 316.462 L 358.649 179.538 C 358.649 168.256 347.903 159 334.805 159 L 175.844 159 Z  M 175.844 172.692 L 334.805 172.692 C 339.272 172.692 342.753 175.691 342.753 179.538 L 342.753 200.077 L 167.896 200.077 L 167.896 179.538 C 167.896 175.691 171.314 172.692 175.844 172.692 Z  M 167.896 213.769 L 342.753 213.769 L 342.753 316.462 C 342.753 320.309 339.272 323.308 334.805 323.308 L 175.844 323.308 C 173.725 323.341 171.68 322.631 170.181 321.34 C 168.682 320.048 167.857 318.287 167.896 316.462 L 167.896 213.769 Z "
            />
        </SvgIcon>
        );
    }
        

function IconSize2(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                d=" M 148.731 121.125 C 131.3 121.125 116.916 133.442 117 148.457 L 117 330.668 C 117 345.683 131.3 358 148.731 358 L 360.269 358 C 377.7 358 392 345.683 392 330.668 L 392 148.457 C 392 133.442 377.7 121.125 360.269 121.125 L 148.731 121.125 Z  M 148.731 139.346 L 360.269 139.346 C 366.213 139.346 370.846 143.337 370.846 148.457 L 370.846 175.788 L 138.154 175.788 L 138.154 148.457 C 138.154 143.337 142.702 139.346 148.731 139.346 Z  M 138.154 194.01 L 370.846 194.01 L 370.846 330.668 C 370.846 335.788 366.213 339.779 360.269 339.779 L 148.731 339.779 C 145.91 339.824 143.19 338.878 141.195 337.16 C 139.2 335.442 138.102 333.098 138.154 330.668 L 138.154 194.01 Z "
            />
        </SvgIcon>
        );
    }
          

function IconSize4(props) {
    return (
        <SvgIcon 
            {...props} 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" 
            y="0px"
            viewBox="0 0 512 512" 
            style={{enableBackground:"new 0 0 512 512"}} 
            xmlSpace="preserve" >
            <path 
                d=" M 117.154 108.245 C 95.096 108.245 76.893 123.833 77 142.833 L 77 373.413 C 77 392.413 95.096 408 117.154 408 L 384.846 408 C 406.904 408 425 392.413 425 373.413 L 425 142.833 C 425 123.833 406.904 108.245 384.846 108.245 L 117.154 108.245 Z  M 117.154 131.303 L 384.846 131.303 C 392.368 131.303 398.231 136.353 398.231 142.833 L 398.231 177.42 L 103.77 177.42 L 103.77 142.833 C 103.77 136.353 109.525 131.303 117.154 131.303 Z  M 103.77 200.478 L 398.231 200.478 L 398.231 373.413 C 398.231 379.892 392.368 384.942 384.846 384.942 L 117.154 384.942 C 113.585 384.999 110.142 383.802 107.617 381.628 C 105.093 379.453 103.704 376.488 103.77 373.413 L 103.77 200.478 Z "
            />
        </SvgIcon>
        );
    }
