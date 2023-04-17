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

            // CAMERA
            // imposta l'angolo, e la distanza di rendering
            HederaJS.world.setCameraProjectionPerspective(45, 0.1, 300);

            // imposta il punto cui guarda la camera (camera AIM) e la distanza
            HederaJS.world.setTargetCameraOrbitView(0, 0.5, 0, 20);

            // valore della posizione della camera traslato dal punto impostato con setTargetCameraOrbitView()
            HederaJS.world.translateCameraOrbitView(330, 0, 1);

            // aggiorna la view della camera
            HederaJS.world.updateCameraOrbitView();

            const hour_hand = HederaJS.world.getEntity("hour_hand");
            const minute_hand = HederaJS.world.getEntity("minute_hand");
            const second_hand = HederaJS.world.getEntity("second_hand");
            const back = HederaJS.world.getEntity("back");
            const alarm_hand = HederaJS.world.getEntity("alarm_hand");
            const body = HederaJS.world.getEntity("body");
            const sveglia_prog = HederaJS.world.getEntity("sveglia_prog");
            const sveglia_on_off = HederaJS.world.getEntity("sveglia_on_off");
            const click_here_widget = HederaJS.world.getEntity("click_here_widget");

            // lancetta delle ore
            HederaJS.world.changeComponentColor(
                hour_hand,
                0,
                50 / 255,
                50 / 255,
                50 / 255,
                1
            );

            // lancetta dei minuti
            HederaJS.world.changeComponentColor(
                minute_hand,
                0,
                50 / 255,
                50 / 255,
                50 / 255,
                1
            );

            // lancetta dei secondi
            HederaJS.world.changeComponentColor(
                second_hand,
                0,
                200 / 255,
                0 / 255,
                0 / 255,
                1
            );

            // retro della sveglia
            HederaJS.world.changeComponentColor(
                back,
                0,
                50 / 255,
                50 / 255,
                50 / 255,
                1
            );

            // lancetta della sveglia
            HederaJS.world.changeComponentColor(
                alarm_hand,
                0,
                50 / 255,
                50 / 255,
                50 / 255,
                1
            );

            // corpo della sveglia
            HederaJS.world.changeComponentColor(
                body,
                0,
                200 / 255,
                0 / 255,
                0 / 255,
                1
            );

            // pomello destro
            HederaJS.world.changeComponentColor(
                sveglia_prog,
                0,
                200 / 255,
                0 / 255,
                0 / 255,
                1
            );

            // pomello sinistro
            HederaJS.world.changeComponentColor(
                sveglia_on_off,
                0,
                200 / 255,
                0 / 255,
                0 / 255,
                1
            );

            // widgets sveglia
            HederaJS.world.translate(click_here_widget, 1.325, 0.5, -1.2);

            let currentMouseDragX = 0;
            let currentMouseDragY = 0;
            let lastMouseDragX = 0;
            let lastMouseDragY = 0;
            let mouseClickX = 0;
            let mouseClickY = 0;

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

                    document.getElementById("indicator")!.style.display = "none";
                    let x = currentMouseDragX * HederaJS.getDeltaTime();
                    let y = currentMouseDragY * HederaJS.getDeltaTime();
                    HederaJS.world.translateCameraOrbitView(x, y, 14);
                    HederaJS.world.updateCameraOrbitView();
                }
            });

            canvas.addEventListener("touchstart", (e) => {
                lastMouseDragX = e.touches[0].clientX;
                lastMouseDragY = e.touches[0].clientY;
                mouseClickX = e.touches[0].clientX;
                mouseClickY = e.touches[0].clientY;
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
                HederaJS.world.followView(click_here_widget);
            });
        });
    });
});
