import HederaJS from "./hedera";
import "./index.scss";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

HederaJS.init(canvas).then(() => {
    HederaJS.start().then(() => {
        HederaJS.fetchAndLoadAssets({
            url: "./hpk/AlarmClock.zip",
            type: "ZIP",
        }).then(() => {
            // CAMERA
            // imposta l'angolo, e la distanza di rendering
            HederaJS.world.setCameraProjectionPerspective(45, 0.1, 300);

            // imposta il punto cui guarda la camera (camera AIM) e la distanza
            HederaJS.world.setTargetCameraOrbitView(0, 0.5, 0, 20);

            // valore della posizione della camera traslato dal punto impostato con setTargetCameraOrbitView()
            HederaJS.world.translateCameraOrbitView(330, 0, 1);

            // aggiorna la view della camera
            HederaJS.world.updateCameraOrbitView();
        });
    });
});
