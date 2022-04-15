export const convertVersion = (version: number) => {
    let ver = "";
    switch (version) {
        case 1:
            ver = "1st";
            break;
        case 2:
            ver = "2nd";
            break;
        case 3:
            ver = "obg";
            break;
        case 4:
            ver = "obgse";
            break;
        case 5:
            ver = "pc";
            break;
        case 6:
            ver = "extra";
            break;
        case 7:
            ver = "rebirth";
            break;
        case 8:
            ver = "prex3";
            break;
        case 9:
            ver = "exceed";
            break;
        case 10:
            ver = "exceed2";
            break;
        case 11:
            ver = "zero";
            break;
        case 12:
            ver = "nx";
            break;
        case 13:
            ver = "nx2";
            break;
        case 14:
            ver = "nxa";
            break;
        case 15:
            ver = "f1";
            break;
        case 16:
            ver = "fex";
            break;
        case 17:
            ver = "f2";
            break;
        case 18:
            ver = "p1";
            break;
        case 19:
            ver = "p2";
            break;
        case 20:
            ver = "xx";
            break;
        default:
            ver = "";
            break;
    }
    return ver;
};
