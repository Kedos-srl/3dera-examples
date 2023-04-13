import HederaJS from "./hedera";
import "./index.scss";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

HederaJS.init(canvas).then(() => {
    HederaJS.start().then(() => {
        HederaJS.fetchAndLoadAssets({
            url: "./hpk/AlarmClock.zip",
            type: "ZIP",
        }).then(() => {
            document.getElementById("indicator")!.style.display = "block";

            // funzione per far partire la sveglia
            let startAlarm = () => {
                alarmClockSound.play();
                let maxRotation = -18;
                idAnimation = setInterval(() => {
                    if (gavelRotation <= maxRotation) {
                        gavelRotation += 5;
                        maxRotation = 20;
                    } else {
                        gavelRotation -= 5;
                        maxRotation = -20;
                    }
                    HederaJS.world.setRotation(
                        entities.e[6],
                        0,
                        0,
                        gavelRotation
                    );
                }, 5);
            };

            // funzione per fermare la sveglia
            let stopAlarm = () => {
                alarmClockSound.pause();
                clearInterval(idAnimation);
                gavelRotation = 0;
                HederaJS.world.setRotation(entities.e[6], 0, 0, gavelRotation);
            };

            // CAMERA
            // imposta l'angolo, e la distanza di rendering
            HederaJS.world.setCameraProjectionPerspective(45, 0.1, 300);

            // imposta il punto cui guarda la camera (camera AIM) e la distanza
            HederaJS.world.setTargetCameraOrbitView(0, 0.5, 0, 20);

            // valore della posizione della camera traslato dal punto impostato con setTargetCameraOrbitView()
            HederaJS.world.translateCameraOrbitView(330, 0, 1);

            // aggiorna la view della camera
            HederaJS.world.updateCameraOrbitView();

            // permette la selezione degli oggetti nella scena
            HederaJS.world.enableOnScreenSelection();

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
                    this.e[17] = HederaJS.world.getEntity("click_here_widget");
                }

                entitySelected = (x: Number, y: Number) => {
                    let hit = HederaJS.world.searchOnScreen(x, y);
                    for (let i = 0; i < this.e.length; i++) {
                        if (hit.id === this.e[i].id) {
                            return i;
                        }
                    }
                    return -1;
                };
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

            // widgets sveglia
            HederaJS.world.translate(entities.e[17], 1.325, 0.5, -1.2);

            let currentMouseDragX = 0;
            let currentMouseDragY = 0;
            let lastMouseDragX = 0;
            let lastMouseDragY = 0;
            let mouseClickX = 0;
            let mouseClickY = 0;
            let indexSelectedItem = 0;

            // sveglia
            let alarmClockSound = document.getElementById(
                "alarm-clock-sound"
            ) as HTMLAudioElement;
            let alarmBtn = false;
            let idAnimation: any;
            let gavelRotation = 0;

            // eventi
            HederaJS.onMouseDown((e: MouseEvent) => {
                if (e.buttons === 1) {
                    lastMouseDragX = e.x;
                    lastMouseDragY = e.y;
                }
            });

            HederaJS.onMouseMove((e: MouseEvent) => {
                if (e.buttons === 1) {
                    currentMouseDragX = e.x - lastMouseDragX;
                    currentMouseDragY = e.y - lastMouseDragY;
                    lastMouseDragX = e.x;
                    lastMouseDragY = e.y;

                    document.getElementById("indicator")!.style.display =
                        "none";
                    let x = currentMouseDragX * HederaJS.getDeltaTime();
                    let y = currentMouseDragY * HederaJS.getDeltaTime();
                    HederaJS.world.translateCameraOrbitView(x, y, 14);
                    HederaJS.world.updateCameraOrbitView();
                }
            });

            canvas.addEventListener("click", function (e) {
                // cattura le coordinate del mouse in base alle dimensioni del canvas
                let scaleX = canvas.width / HederaJS.rect.width;
                let scaleY = canvas.height / HederaJS.rect.height;
                mouseClickX = (e.x - HederaJS.rect.left) * scaleX;
                mouseClickY = (e.y - HederaJS.rect.top) * scaleY;

                indexSelectedItem = entities.entitySelected(
                    mouseClickX,
                    mouseClickY
                );
                if (indexSelectedItem === 16) {
                    alarmBtn = !alarmBtn;
                    if (alarmBtn) {
                        HederaJS.world.translate(entities.e[16], 0, 0, 0.1);
                        startAlarm();
                    } else {
                        HederaJS.world.translate(entities.e[16], 0, 0, -0.1);
                        stopAlarm();
                    }
                }
            });

            canvas.addEventListener("touchstart", (e) => {
                lastMouseDragX = e.touches[0].clientX;
                lastMouseDragY = e.touches[0].clientY;
                mouseClickX = e.touches[0].clientX;
                mouseClickY = e.touches[0].clientY;

                // cattura le coordinate del mouse in base alle dimensioni del canvas
                let scaleX = canvas.width / HederaJS.rect.width;
                let scaleY = canvas.height / HederaJS.rect.height;
                mouseClickX = (e.touches[0].clientX - HederaJS.rect.left) * scaleX;
                mouseClickY = (e.touches[0].clientY - HederaJS.rect.top) * scaleY;

                indexSelectedItem = entities.entitySelected(
                    mouseClickX,
                    mouseClickY
                );
                if (indexSelectedItem === 16) {
                    alarmBtn = !alarmBtn;
                    if (alarmBtn) {
                        HederaJS.world.translate(entities.e[16], 0, 0, 0.1);
                        startAlarm();
                    } else {
                        HederaJS.world.translate(entities.e[16], 0, 0, -0.1);
                        stopAlarm();
                    }
                }
            });

            canvas.addEventListener("touchmove", (e) => {
                currentMouseDragX = e.touches[0].clientX - lastMouseDragX;
                currentMouseDragY = e.touches[0].clientY - lastMouseDragY;
                lastMouseDragX = e.touches[0].clientX;
                lastMouseDragY = e.touches[0].clientY;

                document.getElementById("indicator")!.style.display = "none";
                let x = currentMouseDragX * HederaJS.getDeltaTime();
                let y = currentMouseDragY * HederaJS.getDeltaTime();
                HederaJS.world.translateCameraOrbitView(x, y, 14);
                HederaJS.world.updateCameraOrbitView();
            });

            // EDERA UPDATA
            HederaJS.onUpdate(() => {
                // permette al widget di seguire la camera
                HederaJS.world.followView(entities.e[17]);
            });
        });
    });
});
