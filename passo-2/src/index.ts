import HederaJS from "./hedera";
import "./index.scss";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

HederaJS.init(canvas).then(() => {
    HederaJS.start().then(() => {
        HederaJS.fetchAndLoadAssets({
            url: "./hpk/AlarmClock.zip",
            type: "ZIP",
        }).then(() => {});
    });
});
