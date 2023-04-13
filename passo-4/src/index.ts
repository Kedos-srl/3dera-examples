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

            class Entities {
                e: any[] = [];

                constructor() {
                    this.e[0] = HederaJS.world.getEntity("face");
                    this.e[1] = HederaJS.world.getEntity("hour_hand");
                    this.e[2] = HederaJS.world.getEntity("minute_hand");
                    this.e[3] = HederaJS.world.getEntity("second_hand");
                    this.e[4] = HederaJS.world.getEntity("glass");
                    this.e[5] = HederaJS.world.getEntity("bells");
                    this.e[6] = HederaJS.world.getEntity("gavel");
                    this.e[7] = HederaJS.world.getEntity("ring_back");
                    this.e[8] = HederaJS.world.getEntity("ring_front");
                    this.e[9] = HederaJS.world.getEntity("back");
                    this.e[10] = HederaJS.world.getEntity("legs");
                    this.e[11] = HederaJS.world.getEntity("washer");
                    this.e[12] = HederaJS.world.getEntity("viti");
                    this.e[13] = HederaJS.world.getEntity("alarm_hand");
                    this.e[14] = HederaJS.world.getEntity("body");
                    this.e[15] = HederaJS.world.getEntity("sveglia_prog");
                    this.e[16] = HederaJS.world.getEntity("sveglia_on_off");
                }
            }

            let entities = new Entities();

            // lancetta delle ore
            HederaJS.world.changeComponentColor(
                entities.e[1],
                0,
                50 / 255.0,
                50 / 255.0,
                50 / 255.0,
                1
            );

            // lancetta dei minuti
            HederaJS.world.changeComponentColor(
                entities.e[2],
                0,
                50 / 255.0,
                50 / 255.0,
                50 / 255.0,
                1
            );

            // lancetta dei secondi
            HederaJS.world.changeComponentColor(
                entities.e[3],
                0,
                200 / 255.0,
                0 / 255.0,
                0 / 255.0,
                1
            );

            // retro della sveglia
            HederaJS.world.changeComponentColor(
                entities.e[9],
                0,
                50 / 255.0,
                50 / 255.0,
                50 / 255.0,
                1
            );

            // lancetta della sveglia
            HederaJS.world.changeComponentColor(
                entities.e[13],
                0,
                50 / 255.0,
                50 / 255.0,
                50 / 255.0,
                1
            );

            // corpo della sveglia
            HederaJS.world.changeComponentColor(
                entities.e[14],
                0,
                200 / 255.0,
                0 / 255.0,
                0 / 255.0,
                1
            );

            // pomello destro
            HederaJS.world.changeComponentColor(
                entities.e[15],
                0,
                200 / 255.0,
                0 / 255.0,
                0 / 255.0,
                1
            );

            // pomello sinistro
            HederaJS.world.changeComponentColor(
                entities.e[16],
                0,
                200 / 255.0,
                0 / 255.0,
                0 / 255.0,
                1
            );
        });
    });
});
