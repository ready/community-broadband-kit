import React, { useState, useEffect } from 'react'
import styles from './LandscapeBackground.module.css'

const LandscapeBackground = () => {
  const [scrollY, setScrollY] = useState(0)
  const [city, setCity] = useState(0)
  const [hillBehind, setHillBehind] = useState(0)

  function handleScrollHeight () {
    setScrollY(window.pageYOffset)
    setCity(scrollY * 0.18)
    setHillBehind(scrollY * 0.1)
  }

  useEffect(() => {
    function watchScroll () {
      window.addEventListener('scroll', handleScrollHeight)
    }
    watchScroll()
    return () => {
      window.removeEventListener('scroll', handleScrollHeight)
    }
  })

  const handleCityTransform = () => {
    return `translateY(${city}px)`
  }

  const handleHillBehindTransform = () => {
    return `translateY(${hillBehind}px)`
  }

  return (
    <div className={styles.landscape}>
      <svg viewBox='0 0 1296 372' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g className={styles.city} style={{ transform: handleCityTransform() }}>
          <path fillRule='evenodd' clipRule='evenodd' d='M1011.73 60.4781H1004.26C1004.26 120.119 1004.29 127.249 1004.29 186.973C1016.9 186.973 1029.51 186.973 1042.12 186.973C1042.12 127.249 1042.18 120.119 1042.18 60.4781H1034.71L1023.22 50.6638L1011.73 60.4781Z' fill='#8B96A1' />
          <path fillRule='evenodd' clipRule='evenodd' d='M1078.9 61.7123V128.119L1087.06 124.149V189.158H1119.5V178.505L1111.83 174.674V79.6631L1103.56 75.5249V47.8996H1095.42L1078.9 56.204V61.7123Z' fill='#9BA1A9' />
          <path fillRule='evenodd' clipRule='evenodd' d='M1144.86 52.1959H1139.66V39.6974H1136.03C1136.03 37.125 1133.93 35 1131.33 35C1128.76 35 1126.66 37.0971 1126.66 39.6974H1123.03V52.1959H1117.83V64.6944H1113.1V78.6469C1112.77 78.3672 1112.43 78.2274 1112.07 78.2274V173.993C1125.6 173.993 1139.13 173.993 1152.67 173.993V78.2274C1151.94 78.2274 1151.27 78.3672 1150.6 78.6469V64.6944H1144.89V52.1959H1144.86Z' fill='#8B96A1' />
          <path fillRule='evenodd' clipRule='evenodd' d='M1078.98 174.125H1042.04V83.2803H1053.9V80.1487H1070.36V83.2803H1078.98V174.125Z' fill='#8B96A1' />
          <path fillRule='evenodd' clipRule='evenodd' d='M996.798 98.1959H991.597V85.6974H987.962C987.962 83.0971 985.865 81 983.265 81C980.665 81 978.568 83.0971 978.568 85.6974H974.933V98.1679H969.732V110.666H965.035V124.619C964.699 124.339 964.363 124.199 964 124.199V183.868C977.533 183.868 991.066 183.868 1004.6 183.868V124.227C1003.87 124.227 1003.17 124.367 1002.5 124.647V110.694H996.798V98.1959V98.1959Z' fill='#9BA1A9' />
          <ellipse cx='1023.67' cy='49.3943' rx='2.66667' ry='2.39435' fill='#1F3E66' />
          <path d='M1042.87 48.8207C1042.89 45.7154 1042.17 42.649 1040.75 39.8721C1039.34 37.0952 1037.28 34.6868 1034.74 32.8436C1032.2 31.0005 1029.25 29.7751 1026.14 29.2675C1023.02 28.7598 1019.83 28.9845 1016.82 29.9231' stroke='#3E89ED' strokeWidth='3' strokeLinecap='round' />
          <path d='M1037.59 48.939C1037.6 46.6963 1037.08 44.4816 1036.06 42.4761C1035.04 40.4706 1033.55 38.7312 1031.71 37.4C1029.88 36.0689 1027.75 35.1838 1025.5 34.8172C1023.25 34.4506 1020.95 34.6129 1018.77 35.2907' stroke='#3E89ED' strokeWidth='3' strokeLinecap='round' />
          <path d='M1032.46 49.4617C1032.47 47.9953 1032.12 46.5473 1031.46 45.236C1030.79 43.9247 1029.82 42.7874 1028.62 41.917C1027.42 41.0466 1026.02 40.4679 1024.55 40.2282C1023.08 39.9885 1021.58 40.0946 1020.16 40.5378' stroke='#3E89ED' strokeWidth='3' strokeLinecap='round' />
        </g>
        <g className={styles.hill_behind} style={{ transform: handleHillBehindTransform() }}>
          <path fillRule='evenodd' clipRule='evenodd' d='M322 108.441C365.907 86.1645 628.075 21.2238 820.999 92.4895C1013.92 163.755 965.79 145.7 1082.87 145.7C1199.96 145.7 1200.73 275.694 1200.73 275.694L322 270.783V108.441Z' fill='#C7DFFF' />
          <path opacity='0.4' fillRule='evenodd' clipRule='evenodd' d='M886.229 116.734C886.229 116.734 875.594 114.789 863.326 121.568C851.057 128.347 865.132 139.874 872.029 147.205C878.926 154.536 857.534 171.018 857.534 171.018L875.5 169C875.5 169 886.229 165 887.764 150.164C881.635 137.6 869.068 133.43 878.534 128.018C885.612 125.001 900.534 121.568 900.534 121.568L886.229 116.734Z' fill='#4DDFDD' />
        </g>
        <g className={styles.hill_ahead}>
          <path d='M1296 105.784C1132.5 105.784 1015.5 113.813 926.5 154.5C827.5 199.759 646 135 555 98C464 61 70.3752 17 0 17V371.926H1296V105.784Z' fill='#E6F1FF' />
          <line x1='1040.5' y1='170.331' x2='1040.5' y2='162.146' stroke='#3E89ED' strokeWidth='3' strokeLinecap='round' />
          <path d='M1044.25 157.758C1044.25 159.967 1042.46 161.758 1040.25 161.758C1038.04 161.758 1036.25 159.967 1036.25 157.758C1036.25 155.549 1038.04 153.758 1040.25 153.758C1042.46 153.758 1044.25 155.549 1044.25 157.758ZM1038.45 157.758C1038.45 158.752 1039.25 159.558 1040.25 159.558C1041.24 159.558 1042.05 158.752 1042.05 157.758C1042.05 156.764 1041.24 155.958 1040.25 155.958C1039.25 155.958 1038.45 156.764 1038.45 157.758Z' fill='#3E89ED' />
          <path d='M1051.8 166.959C1053.36 165.421 1054.54 163.542 1055.22 161.475C1055.9 159.408 1056.08 157.211 1055.73 155.064C1055.39 152.917 1054.53 150.881 1053.23 149.122C1051.93 147.363 1050.23 145.932 1048.26 144.945' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M1049.11 164.463C1050.24 163.353 1051.08 161.996 1051.58 160.503C1052.07 159.01 1052.2 157.423 1051.95 155.872C1051.7 154.322 1051.08 152.851 1050.14 151.581C1049.2 150.311 1047.97 149.277 1046.55 148.565' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M1046.29 162.242C1047.03 161.516 1047.58 160.629 1047.9 159.653C1048.23 158.677 1048.31 157.639 1048.15 156.625C1047.98 155.611 1047.58 154.65 1046.96 153.82C1046.35 152.989 1045.55 152.313 1044.62 151.847' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M1028.74 166.959C1027.18 165.421 1026 163.542 1025.32 161.475C1024.64 159.408 1024.46 157.211 1024.81 155.064C1025.15 152.917 1026.01 150.881 1027.31 149.122C1028.61 147.363 1030.31 145.932 1032.28 144.945' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M1031.43 164.463C1030.3 163.353 1029.46 161.996 1028.96 160.503C1028.47 159.01 1028.34 157.423 1028.59 155.872C1028.84 154.322 1029.46 152.851 1030.4 151.581C1031.34 150.311 1032.57 149.277 1033.99 148.565' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M1034.25 162.242C1033.51 161.516 1032.96 160.629 1032.64 159.653C1032.31 158.677 1032.23 157.639 1032.39 156.625C1032.56 155.611 1032.96 154.65 1033.58 153.82C1034.19 152.989 1034.99 152.313 1035.92 151.847' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <line x1='618.5' y1='97.3305' x2='618.5' y2='89.1456' stroke='#3E89ED' strokeWidth='3' strokeLinecap='round' />
          <path d='M622.248 84.7583C622.248 86.9675 620.457 88.7583 618.248 88.7583C616.038 88.7583 614.248 86.9675 614.248 84.7583C614.248 82.5492 616.038 80.7583 618.248 80.7583C620.457 80.7583 622.248 82.5492 622.248 84.7583ZM616.448 84.7583C616.448 85.7525 617.253 86.5583 618.248 86.5583C619.242 86.5583 620.048 85.7525 620.048 84.7583C620.048 83.7642 619.242 82.9583 618.248 82.9583C617.253 82.9583 616.448 83.7642 616.448 84.7583Z' fill='#3E89ED' />
          <path d='M629.803 93.9585C631.365 92.4214 632.536 90.5424 633.218 88.475C633.901 86.4077 634.077 84.2107 633.731 82.0637C633.386 79.9167 632.529 77.8807 631.23 76.1221C629.931 74.3635 628.228 72.9322 626.26 71.9454' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M627.111 91.4631C628.239 90.353 629.084 88.9959 629.577 87.5028C630.07 86.0097 630.197 84.423 629.948 82.8724C629.698 81.3218 629.079 79.8513 628.141 78.5812C627.203 77.3111 625.973 76.2774 624.551 75.5647' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M624.291 89.2423C625.029 88.5165 625.582 87.6291 625.904 86.6529C626.227 85.6766 626.31 84.6392 626.146 83.6253C625.983 82.6115 625.578 81.65 624.965 80.8195C624.352 79.9891 623.548 79.3132 622.618 78.8472' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M606.738 93.9585C605.176 92.4214 604.005 90.5424 603.323 88.475C602.64 86.4077 602.464 84.2107 602.81 82.0637C603.155 79.9167 604.012 77.8807 605.311 76.1221C606.61 74.3635 608.313 72.9322 610.281 71.9454' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M609.43 91.4631C608.302 90.353 607.457 88.9959 606.964 87.5028C606.471 86.0097 606.344 84.423 606.593 82.8724C606.843 81.3218 607.462 79.8513 608.4 78.5812C609.338 77.3111 610.568 76.2774 611.99 75.5647' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M612.25 89.2423C611.512 88.5165 610.959 87.6291 610.637 86.6529C610.314 85.6766 610.231 84.6392 610.395 83.6253C610.558 82.6115 610.963 81.65 611.576 80.8195C612.189 79.9891 612.993 79.3132 613.923 78.8472' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <line x1='284.5' y1='31.3305' x2='284.5' y2='23.1455' stroke='#3E89ED' strokeWidth='3' strokeLinecap='round' />
          <path d='M288.5 19C288.5 21.2091 286.709 23 284.5 23C282.291 23 280.5 21.2091 280.5 19C280.5 16.7909 282.291 15 284.5 15C286.709 15 288.5 16.7909 288.5 19ZM282.7 19C282.7 19.9941 283.506 20.8 284.5 20.8C285.494 20.8 286.3 19.9941 286.3 19C286.3 18.0059 285.494 17.2 284.5 17.2C283.506 17.2 282.7 18.0059 282.7 19Z' fill='#3E89ED' />
          <path d='M295.803 27.9585C297.365 26.4215 298.535 24.5424 299.218 22.4751C299.901 20.4077 300.076 18.2107 299.731 16.0637C299.385 13.9167 298.528 11.8807 297.229 10.1221C295.931 8.36349 294.228 6.93225 292.259 5.94539' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M293.11 25.4631C294.238 24.353 295.084 22.9959 295.577 21.5028C296.07 20.0097 296.197 18.423 295.947 16.8724C295.697 15.3218 295.078 13.8513 294.14 12.5812C293.203 11.3111 291.972 10.2774 290.551 9.56469' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M290.291 23.2423C291.029 22.5165 291.581 21.6292 291.904 20.6529C292.226 19.6767 292.309 18.6392 292.146 17.6253C291.983 16.6115 291.578 15.65 290.965 14.8196C290.351 13.9891 289.547 13.3132 288.618 12.8472' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M272.737 27.9585C271.175 26.4215 270.005 24.5424 269.322 22.4751C268.639 20.4077 268.464 18.2107 268.809 16.0637C269.155 13.9167 270.012 11.8807 271.311 10.1221C272.609 8.36349 274.312 6.93225 276.281 5.94539' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M275.43 25.4631C274.302 24.353 273.456 22.9959 272.963 21.5028C272.47 20.0097 272.343 18.423 272.593 16.8724C272.843 15.3218 273.462 13.8513 274.4 12.5812C275.337 11.3111 276.568 10.2774 277.989 9.56469' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path d='M278.249 23.2423C277.511 22.5165 276.959 21.6292 276.636 20.6529C276.314 19.6767 276.231 18.6392 276.394 17.6253C276.557 16.6115 276.962 15.65 277.575 14.8196C278.189 13.9891 278.993 13.3132 279.922 12.8472' stroke='#3E89ED' strokeWidth='2' strokeLinecap='round' />
          <path opacity='0.55' d='M282 89V168.5H339M612.5 149V168.5H572.5M572.5 168.5V139.5M572.5 168.5H339M339 168.5V337.5H232M339 168.5H125.5V159.5M164 304.5V337.5H232M232 337.5V330' stroke='#FB0278' strokeLinecap='round' />
          <g clipPath='url(#clip0_1746_36351)'>
            <ellipse opacity='0.4' cx='1067.32' cy='216.435' rx='22.5602' ry='6.0848' transform='rotate(-8.21926 1067.32 216.435)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M1019 219.066H1044.58V185.888L1031.79 169.871L1019 185.888V219.066Z' fill='#5990D9' />
            <path fillRule='evenodd' clipRule='evenodd' d='M1044.58 185.888L1031.79 169.871H1049.24L1062.02 185.888V219.066H1044.58V185.888Z' fill='#4072B3' />
            <path fillRule='evenodd' clipRule='evenodd' d='M1034.12 199.617H1039.93V193.896C1039.93 192.095 1038.87 190.464 1037.02 190.464C1035.35 190.464 1034.12 191.915 1034.12 193.896V199.617ZM1023.65 199.617H1029.47V193.896C1029.47 191.915 1028.23 190.464 1026.56 190.464C1024.71 190.464 1023.65 192.095 1023.65 193.896V199.617Z' fill='#E5F0FF' />
          </g>
          <ellipse opacity='0.4' cx='1158.43' cy='255.847' rx='15.1411' ry='4.08377' transform='rotate(-8.21926 1158.43 255.847)' fill='#2B558C' />
          <path fillRule='evenodd' clipRule='evenodd' d='M1126 257.425H1143.17V235.158L1134.58 224.409L1126 235.158V257.425Z' fill='#9EC8FF' />
          <path fillRule='evenodd' clipRule='evenodd' d='M1143.17 235.158L1134.58 224.409H1146.29L1154.87 235.158V257.425H1143.17V235.158Z' fill='#4072B3' />
          <path fillRule='evenodd' clipRule='evenodd' d='M1136.14 244.372H1140.05V240.533C1140.05 239.324 1139.33 238.229 1138.1 238.229C1136.97 238.229 1136.14 239.203 1136.14 240.533V244.372ZM1129.12 244.372H1133.02V240.533C1133.02 239.203 1132.2 238.229 1131.07 238.229C1129.84 238.229 1129.12 239.324 1129.12 240.533V244.372Z' fill='#E5F0FF' />
          <ellipse opacity='0.4' cx='1182.43' cy='267.654' rx='15.1411' ry='4.08377' transform='rotate(-8.21926 1182.43 267.654)' fill='#2B558C' />
          <path fillRule='evenodd' clipRule='evenodd' d='M1150 269.232H1167.17V246.965L1158.58 236.215L1150 246.965V269.232Z' fill='#9EC8FF' />
          <path fillRule='evenodd' clipRule='evenodd' d='M1167.17 246.965L1158.58 236.215H1170.29L1178.87 246.965V269.232H1167.17V246.965Z' fill='#4072B3' />
          <path fillRule='evenodd' clipRule='evenodd' d='M1160.14 256.179H1164.05V252.34C1164.05 251.131 1163.33 250.036 1162.1 250.036C1160.97 250.036 1160.14 251.01 1160.14 252.34V256.179ZM1153.12 256.179H1157.02V252.34C1157.02 251.01 1156.2 250.036 1155.07 250.036C1153.84 250.036 1153.12 251.131 1153.12 252.34V256.179Z' fill='#E5F0FF' />
          <g clipPath='url(#clip1_1746_36351)'>
            <ellipse opacity='0.4' cx='605.272' cy='132.873' rx='20.5806' ry='9.5062' transform='rotate(-8.21926 605.272 132.873)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M586.565 109.487L570.782 93.9588L555 109.487V138.817L570.709 138.782L586.565 138.817V109.487Z' fill='#9EC8FF' />
            <path fillRule='evenodd' clipRule='evenodd' d='M586.564 109.487L602.346 109.487L585.687 93.9588L570.782 93.9588L586.564 109.487Z' fill='#4072B3' />
            <path d='M602.346 109.487H586.564L586.564 138.817H602.346V109.487Z' fill='#4072B3' />
            <rect width='7.01375' height='7.89047' transform='matrix(-1 0 0 1 568.151 111.657)' fill='#F4F7FB' />
            <rect width='7.01375' height='7.89047' transform='matrix(-1 0 0 1 580.427 111.657)' fill='#F4F7FB' />
            <rect width='7.01375' height='7.89047' transform='matrix(-1 0 0 1 580.427 124.809)' fill='#F4F7FB' />
            <rect width='7.01375' height='7.89047' transform='matrix(-1 0 0 1 568.151 124.809)' fill='#F4F7FB' />
          </g>
          <g clipPath='url(#clip2_1746_36351)'>
            <ellipse opacity='0.4' cx='645.32' cy='145.435' rx='22.5602' ry='6.0848' transform='rotate(-8.21926 645.32 145.435)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M597 148.066H622.581V114.888L609.79 98.8711L597 114.888V148.066Z' fill='#5990D9' />
            <path fillRule='evenodd' clipRule='evenodd' d='M622.581 114.888L609.79 98.8711H627.239L640.023 114.888V148.066H622.581V114.888Z' fill='#4072B3' />
            <path fillRule='evenodd' clipRule='evenodd' d='M612.116 128.617H617.93V122.896C617.93 121.095 616.866 119.464 615.023 119.464C613.348 119.464 612.116 120.915 612.116 122.896V128.617ZM601.651 128.617H607.465V122.896C607.465 120.915 606.234 119.464 604.558 119.464C602.715 119.464 601.651 121.095 601.651 122.896V128.617Z' fill='#E5F0FF' />
          </g>
          <ellipse opacity='0.4' cx='311.945' cy='83.2949' rx='26.5734' ry='12.2743' transform='rotate(-8.21926 311.945 83.2949)' fill='#2B558C' />
          <path fillRule='evenodd' clipRule='evenodd' d='M294.348 50.627L274.593 30.0468L256 50.627V88.3575L275.085 88.3115L294.348 88.3575V50.627Z' fill='#9EC8FF' />
          <path fillRule='evenodd' clipRule='evenodd' d='M294.348 50.6264L316.428 50.6264L294.348 30.0461L274.593 30.0461L294.348 50.6264Z' fill='#4072B3' />
          <path d='M316.428 50.6264H294.349L294.349 88.3569H316.428V50.6264Z' fill='#4072B3' />
          <rect width='9.05605' height='10.1881' transform='matrix(-1 0 0 1 271.819 52.9606)' fill='#F4F7FB' />
          <rect width='9.05605' height='10.1881' transform='matrix(-1 0 0 1 287.668 52.9606)' fill='#F4F7FB' />
          <rect width='9.05605' height='10.1881' transform='matrix(-1 0 0 1 287.668 69.9419)' fill='#F4F7FB' />
          <rect width='9.05605' height='10.1881' transform='matrix(-1 0 0 1 271.819 69.9419)' fill='#F4F7FB' />
          <g clipPath='url(#clip3_1746_36351)'>
            <ellipse opacity='0.4' cx='195.272' cy='296.895' rx='20.5806' ry='9.5062' transform='rotate(-8.21926 195.272 296.895)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M176.565 273.509L160.782 257.981L145 273.509V302.839L160.709 302.804L176.565 302.839V273.509Z' fill='#9EC8FF' />
            <path fillRule='evenodd' clipRule='evenodd' d='M176.564 273.509L192.346 273.509L175.687 257.981L160.782 257.981L176.564 273.509Z' fill='#4072B3' />
            <path d='M192.346 273.509H176.564L176.564 302.839H192.346V273.509Z' fill='#4072B3' />
            <rect width='7.01375' height='7.89047' transform='matrix(-1 0 0 1 158.151 275.679)' fill='#F4F7FB' />
            <rect width='7.01375' height='7.89047' transform='matrix(-1 0 0 1 170.427 275.679)' fill='#F4F7FB' />
            <rect width='7.01375' height='7.89047' transform='matrix(-1 0 0 1 170.427 288.831)' fill='#F4F7FB' />
            <rect width='7.01375' height='7.89047' transform='matrix(-1 0 0 1 158.151 288.831)' fill='#F4F7FB' />
          </g>
          <g clipPath='url(#clip4_1746_36351)'>
            <ellipse opacity='0.3' cx='229.612' cy='309.687' rx='20.7371' ry='2.89336' transform='rotate(-6.50096 229.612 309.687)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M209.35 311.327H213.387V301.505H209.35V311.327Z' fill='#6A8C00' />
            <path fillRule='evenodd' clipRule='evenodd' d='M223.8 292.368C223.8 299.221 218.487 304.931 211.9 304.931C205.312 304.931 200 299.221 200 292.368C200 285.516 205.312 254.909 211.9 254.909C218.487 254.909 223.8 285.516 223.8 292.368Z' fill='#95AF4E' />
          </g>
          <g clipPath='url(#clip5_1746_36351)'>
            <ellipse opacity='0.4' cx='266.321' cy='326.071' rx='22.5602' ry='6.0848' transform='rotate(-8.21926 266.321 326.071)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M218 328.701H243.581V295.523L230.79 279.506L218 295.523V328.701Z' fill='#9EC8FF' />
            <path fillRule='evenodd' clipRule='evenodd' d='M243.581 295.523L230.79 279.506H248.239L261.023 295.523V328.701H243.581V295.523Z' fill='#4072B3' />
            <path fillRule='evenodd' clipRule='evenodd' d='M233.116 309.252H238.93V303.532C238.93 301.73 237.866 300.099 236.023 300.099C234.347 300.099 233.116 301.55 233.116 303.532V309.252ZM222.651 309.252H228.465V303.532C228.465 301.55 227.233 300.099 225.558 300.099C223.714 300.099 222.651 301.73 222.651 303.532V309.252Z' fill='#E5F0FF' />
          </g>
          <ellipse opacity='0.4' cx='146.43' cy='157.458' rx='15.1411' ry='4.08377' transform='rotate(-8.21926 146.43 157.458)' fill='#2B558C' />
          <path fillRule='evenodd' clipRule='evenodd' d='M114 159.036H131.168V136.769L122.584 126.02L114 136.769V159.036Z' fill='#9EC8FF' />
          <path fillRule='evenodd' clipRule='evenodd' d='M131.169 136.769L122.584 126.02H134.295L142.875 136.769V159.036H131.169V136.769Z' fill='#4072B3' />
          <path fillRule='evenodd' clipRule='evenodd' d='M124.145 145.983H128.047V142.144C128.047 140.935 127.333 139.84 126.096 139.84C124.971 139.84 124.145 140.814 124.145 142.144V145.983ZM117.121 145.983H121.023V142.144C121.023 140.814 120.197 139.84 119.072 139.84C117.835 139.84 117.121 140.935 117.121 142.144V145.983Z' fill='#E5F0FF' />
          <g clipPath='url(#clip6_1746_36351)'>
            <ellipse opacity='0.3' cx='1159.47' cy='124.864' rx='14.3343' ry='2' transform='rotate(-6.50096 1159.47 124.864)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M1145.46 125.998H1148.25V119.209H1145.46V125.998Z' fill='#6A8C00' />
            <path fillRule='evenodd' clipRule='evenodd' d='M1155.45 112.893C1155.45 117.63 1151.78 121.577 1147.23 121.577C1142.67 121.577 1139 117.63 1139 112.893C1139 108.157 1142.67 87 1147.23 87C1151.78 87 1155.45 108.157 1155.45 112.893Z' fill='#95AF4E' />
          </g>
          <g clipPath='url(#clip7_1746_36351)'>
            <ellipse opacity='0.3' cx='947.469' cy='278.999' rx='14.3343' ry='2' transform='rotate(-6.50096 947.469 278.999)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M933.463 280.133H936.254V273.343H933.463V280.133Z' fill='#6A8C00' />
            <path fillRule='evenodd' clipRule='evenodd' d='M943.451 267.028C943.451 271.765 939.779 275.712 935.226 275.712C930.672 275.712 927 271.765 927 267.028C927 262.291 930.672 241.135 935.226 241.135C939.779 241.135 943.451 262.291 943.451 267.028Z' fill='#95AF4E' />
          </g>
          <g clipPath='url(#clip8_1746_36351)'>
            <ellipse opacity='0.3' cx='962.237' cy='291.167' rx='13.6349' ry='1.90242' transform='rotate(-6.50096 962.237 291.167)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M948.684 292.027H950.707V287.107H948.684V292.027Z' fill='#6A8C00' />
            <path fillRule='evenodd' clipRule='evenodd' d='M955.923 282.53C955.923 285.963 953.261 288.823 949.961 288.823C946.661 288.823 944 285.963 944 282.53C944 279.097 946.661 263.764 949.961 263.764C953.261 263.764 955.923 279.097 955.923 282.53Z' fill='#648901' />
          </g>
          <g clipPath='url(#clip9_1746_36351)'>
            <ellipse opacity='0.3' cx='809.237' cy='225.247' rx='13.6349' ry='1.90242' transform='rotate(-6.50096 809.237 225.247)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M795.684 226.107H797.707V221.186H795.684V226.107Z' fill='#6A8C00' />
            <path fillRule='evenodd' clipRule='evenodd' d='M802.923 216.609C802.923 220.042 800.261 222.903 796.961 222.903C793.661 222.903 791 220.042 791 216.609C791 213.177 793.661 197.844 796.961 197.844C800.261 197.844 802.923 213.177 802.923 216.609Z' fill='#95AF4E' />
          </g>
          <g clipPath='url(#clip10_1746_36351)'>
            <ellipse opacity='0.3' cx='513.469' cy='243.579' rx='14.3343' ry='2' transform='rotate(-6.50096 513.469 243.579)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M499.463 244.713H502.254V237.923H499.463V244.713Z' fill='#6A8C00' />
            <path fillRule='evenodd' clipRule='evenodd' d='M509.451 231.608C509.451 236.345 505.779 240.292 501.226 240.292C496.672 240.292 493 236.345 493 231.608C493 226.871 496.672 205.715 501.226 205.715C505.779 205.715 509.451 226.871 509.451 231.608Z' fill='#95AF4E' />
          </g>
          <g clipPath='url(#clip11_1746_36351)'>
            <ellipse opacity='0.3' cx='499.237' cy='260.667' rx='13.6349' ry='1.90242' transform='rotate(-6.50096 499.237 260.667)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M485.684 261.527H487.707V256.606H485.684V261.527Z' fill='#6A8C00' />
            <path fillRule='evenodd' clipRule='evenodd' d='M492.923 252.029C492.923 255.462 490.261 258.323 486.961 258.323C483.661 258.323 481 255.462 481 252.029C481 248.597 483.661 233.264 486.961 233.264C490.261 233.264 492.923 248.597 492.923 252.029Z' fill='#648901' />
          </g>
          <g clipPath='url(#clip12_1746_36351)'>
            <ellipse opacity='0.3' cx='530.237' cy='253.387' rx='13.6349' ry='1.90242' transform='rotate(-6.50096 530.237 253.387)' fill='#2B558C' />
            <path fillRule='evenodd' clipRule='evenodd' d='M516.684 254.247H518.707V249.327H516.684V254.247Z' fill='#6A8C00' />
            <path fillRule='evenodd' clipRule='evenodd' d='M523.923 244.75C523.923 248.182 521.261 251.043 517.961 251.043C514.661 251.043 512 248.182 512 244.75C512 241.317 514.661 225.984 517.961 225.984C521.261 225.984 523.923 241.317 523.923 244.75Z' fill='#648901' />
          </g>
          <path opacity='0.3' d='M1185 147.681L1252.89 121.367C1253.96 120.953 1254.77 122.368 1253.88 123.082L1223 147.681' stroke='#2B558C' strokeWidth='3' strokeLinecap='round' />
          <line opacity='0.3' x1='1232.12' y1='132' x2='1235' y2='134.879' stroke='#2B558C' strokeWidth='3' strokeLinecap='round' />
          <path d='M1222.44 148.518L1203.22 65.8711L1184 148.518' stroke='#4072B3' strokeWidth='3' />
          <path d='M1197.73 89.4845H1209.63' stroke='#4072B3' strokeWidth='2' />
          <path d='M1194.07 104.243H1211.46' stroke='#4072B3' strokeWidth='2' />
          <path d='M1195.44 104.735L1215.12 119.493' stroke='#4072B3' strokeWidth='2' />
          <path d='M1191.32 119.493L1212.38 105.227' stroke='#4072B3' strokeWidth='2' />
          <path d='M1197.73 89.4844L1212.38 104.243' stroke='#4072B3' strokeWidth='2' />
          <path d='M1194.53 103.751L1208.71 89.9763' stroke='#4072B3' strokeWidth='2' />
          <path d='M1191.32 119.985H1215.12' stroke='#4072B3' strokeWidth='2' />
          <ellipse cx='1203.22' cy='63.9033' rx='5.49209' ry='5.90334' fill='#4072B3' />
          <path d='M1228.11 44.7963C1225.74 40.7623 1222.44 37.3368 1218.47 34.7999C1214.5 32.2629 1209.97 30.6865 1205.26 30.1997C1200.56 29.7128 1195.8 30.3291 1191.38 31.9984C1186.96 33.6677 1183 36.3425 1179.83 39.8041' stroke='#3E89ED' strokeWidth='3' strokeLinecap='round' />
          <path d='M1221.37 48.8958C1219.66 45.9824 1217.27 43.5084 1214.4 41.6762C1211.53 39.8439 1208.27 38.7054 1204.87 38.3538C1201.47 38.0021 1198.03 38.4473 1194.84 39.6529C1191.64 40.8585 1188.79 42.7903 1186.5 45.2903' stroke='#3E89ED' strokeWidth='3' strokeLinecap='round' />
          <path d='M1215.13 53.4054C1214.01 51.5004 1212.45 49.8828 1210.58 48.6848C1208.7 47.4868 1206.57 46.7424 1204.34 46.5125C1202.12 46.2826 1199.87 46.5737 1197.78 47.3619C1195.7 48.1502 1193.83 49.4133 1192.33 51.0479' stroke='#3E89ED' strokeWidth='3' strokeLinecap='round' />
          <path opacity='0.3' d='M711.687 212.323C709.899 206.133 716.622 200.442 716.479 196.748C716.336 192.156 705.68 191.557 693.665 190.359C673.927 187.863 710.686 153.119 728.994 154.017L732.498 154.616C711.687 157.412 682.652 185.866 698.743 187.364C711.83 188.162 722.629 188.062 721.556 198.645C720.698 207.232 720.412 208.33 723.702 212.922C744.727 214.12 763.25 216.716 768.47 217.914C792.643 223.306 746.086 246.868 812.524 249.863C865.088 251.361 909.07 252.858 906.925 267.934C904.779 283.01 754.596 289 696.669 289C638.741 289 530.395 266.436 545.413 251.361C560.431 236.285 604.414 236.285 623.723 236.285C655.833 235.686 630.445 229.096 634.879 223.306C639.313 216.317 661.555 213.422 692.592 212.323C698.743 212.024 705.251 212.124 711.687 212.323Z' fill='#4DDFDD' />
          <g clipPath='url(#clip13_1746_36351)'>
            <path d='M643.17 268.631C642.893 269.802 640.042 270.37 637.847 269.851C635.652 269.332 634.946 267.923 635.223 266.753C635.499 265.582 636.774 264.588 638.968 265.107C641.163 265.625 643.447 267.461 643.17 268.631Z' fill='#5990D9' />
            <path d='M641.843 268.497C641.731 268.391 641.776 268.204 641.924 268.16L645.781 267.02C645.929 266.977 646.068 267.109 646.032 267.259L645.091 271.169C645.055 271.319 644.87 271.373 644.759 271.267L641.843 268.497Z' fill='#5990D9' />
          </g>
          <g clipPath='url(#clip14_1746_36351)'>
            <path d='M655.966 275.722C655.966 276.925 653.321 278.134 651.066 278.134C648.811 278.134 647.8 276.925 647.8 275.722C647.8 274.519 648.811 273.258 651.066 273.258C653.321 273.258 655.966 274.519 655.966 275.722Z' fill='#9EC8FF' />
            <path d='M654.644 275.897C654.511 275.819 654.511 275.627 654.645 275.55L658.137 273.554C658.27 273.477 658.436 273.574 658.436 273.728L658.419 277.75C658.418 277.904 658.251 278 658.118 277.922L654.644 275.897Z' fill='#9EC8FF' />
          </g>
          <g clipPath='url(#clip15_1746_36351)'>
            <path d='M706.195 221.446C705.737 222.558 707.723 224.683 709.808 225.541C711.893 226.4 713.289 225.667 713.747 224.555C714.204 223.443 713.749 221.892 711.664 221.033C709.579 220.175 706.653 220.334 706.195 221.446Z' fill='#5990D9' />
            <path d='M707.352 222.111C707.505 222.09 707.577 221.912 707.483 221.79L705.014 218.615C704.92 218.493 704.729 218.519 704.671 218.662L703.155 222.388C703.097 222.53 703.215 222.682 703.368 222.661L707.352 222.111Z' fill='#5990D9' />
          </g>
          <g clipPath='url(#clip16_1746_36351)'>
            <path d='M665.966 261.722C665.966 262.925 663.321 264.134 661.066 264.134C658.811 264.134 657.8 262.925 657.8 261.722C657.8 260.519 658.811 259.258 661.066 259.258C663.321 259.258 665.966 260.519 665.966 261.722Z' fill='#5990D9' />
            <path d='M664.644 261.897C664.511 261.819 664.511 261.627 664.645 261.55L668.137 259.554C668.27 259.477 668.436 259.574 668.436 259.728L668.419 263.75C668.418 263.904 668.251 264 668.118 263.922L664.644 261.897Z' fill='#5990D9' />
          </g>
          <path d='M769.051 275.417C768.807 276.595 765.973 277.244 763.765 276.788C761.556 276.332 760.81 274.944 761.053 273.766C761.296 272.588 762.542 271.557 764.75 272.013C766.959 272.469 769.294 274.239 769.051 275.417Z' fill='#5990D9' />
          <path d='M767.72 275.32C767.606 275.218 767.645 275.029 767.792 274.981L771.615 273.732C771.761 273.684 771.904 273.813 771.873 273.964L771.043 277.899C771.011 278.05 770.828 278.109 770.714 278.007L767.72 275.32Z' fill='#5990D9' />
          <g clipPath='url(#clip17_1746_36351)'>
            <path d='M804.034 259.722C804.034 260.925 806.679 262.134 808.934 262.134C811.189 262.134 812.2 260.925 812.2 259.722C812.2 258.519 811.189 257.258 808.934 257.258C806.679 257.258 804.034 258.519 804.034 259.722Z' fill='#9EC8FF' />
            <path d='M805.356 259.897C805.489 259.819 805.489 259.627 805.355 259.55L801.863 257.554C801.73 257.477 801.564 257.574 801.564 257.728L801.581 261.75C801.582 261.904 801.749 262 801.882 261.922L805.356 259.897Z' fill='#9EC8FF' />
          </g>
          <defs>
            <clipPath id='clip0_1746_36351'>
              <rect width='72' height='70.8401' fill='white' transform='translate(1019 162)' />
            </clipPath>
            <clipPath id='clip1_1746_36351'>
              <rect width='72' height='70.8401' fill='white' transform='translate(555 84)' />
            </clipPath>
            <clipPath id='clip2_1746_36351'>
              <rect width='72' height='70.8401' fill='white' transform='translate(597 91)' />
            </clipPath>
            <clipPath id='clip3_1746_36351'>
              <rect width='72' height='70.8401' fill='white' transform='translate(145 248.022)' />
            </clipPath>
            <clipPath id='clip4_1746_36351'>
              <rect width='60' height='59.0334' fill='white' transform='translate(195 254.909)' />
            </clipPath>
            <clipPath id='clip5_1746_36351'>
              <rect width='72' height='70.84' fill='white' transform='translate(218 271.635)' />
            </clipPath>
            <clipPath id='clip6_1746_36351'>
              <rect width='42' height='41.3234' fill='white' transform='translate(1135 87)' />
            </clipPath>
            <clipPath id='clip7_1746_36351'>
              <rect width='42' height='41.3234' fill='white' transform='translate(923 241.135)' />
            </clipPath>
            <clipPath id='clip8_1746_36351'>
              <rect width='32' height='31.4845' fill='white' transform='translate(944 262.78)' />
            </clipPath>
            <clipPath id='clip9_1746_36351'>
              <rect width='32' height='31.4845' fill='white' transform='translate(791 196.86)' />
            </clipPath>
            <clipPath id='clip10_1746_36351'>
              <rect width='42' height='41.3234' fill='white' transform='translate(489 205.715)' />
            </clipPath>
            <clipPath id='clip11_1746_36351'>
              <rect width='32' height='31.4845' fill='white' transform='translate(481 232.28)' />
            </clipPath>
            <clipPath id='clip12_1746_36351'>
              <rect width='32' height='31.4845' fill='white' transform='translate(512 225)' />
            </clipPath>
            <clipPath id='clip13_1746_36351'>
              <rect width='12' height='12' fill='white' transform='translate(635.761 261) rotate(13.2997)' />
            </clipPath>
            <clipPath id='clip14_1746_36351'>
              <rect width='12' height='12' fill='white' transform='translate(647 270)' />
            </clipPath>
            <clipPath id='clip15_1746_36351'>
              <rect width='12' height='12' fill='white' transform='matrix(-0.924691 -0.380718 -0.380718 0.924691 716.665 219.569)' />
            </clipPath>
            <clipPath id='clip16_1746_36351'>
              <rect width='12' height='12' fill='white' transform='translate(657 256)' />
            </clipPath>
            <clipPath id='clip17_1746_36351'>
              <rect width='12' height='12' fill='white' transform='matrix(-1 0 0 1 813 254)' />
            </clipPath>
          </defs>
        </g>
      </svg>
    </div>
  )
}

export default LandscapeBackground