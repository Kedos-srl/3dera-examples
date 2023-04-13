export default class HederaJS {
    public static world: any;
    private static canvas: HTMLCanvasElement;
    public static Hedera: IHedera = (window as { [key: string]: any })[
        "Hedera"
    ];

    private static mousedownHandlers: Function[] = [];
    private static mousemoveHandlers: Function[] = [];
    private static mousewheelHandlers: Function[] = [];

    private constructor() {}
    public static async init(canvas: HTMLCanvasElement) {
        return new Promise(function (resolve, reject) {
            canvas.getContext("webgl", { premultipliedAlpha: false });
            HederaJS.canvas = canvas;

            HederaJS.Hedera.start(canvas);
            window.addEventListener("on_hedera_startup", () => {
                HederaJS.Hedera = (window as { [key: string]: any })["Hedera"];
                HederaJS.Hedera.update = () => {};
                resolve(HederaJS.Hedera);
            });
        });
    }
    public static async start() {
        return new Promise(function (resolve, reject) {
            HederaJS.canvas.width =
                HederaJS.canvas.clientWidth * window.devicePixelRatio;
            HederaJS.canvas.height =
                HederaJS.canvas.clientHeight * window.devicePixelRatio;
            var gl = HederaJS.canvas.getContext("webgl", {
                premultipliedAlpha: false,
            });
            // window.addEventListener(
            //     "resize",
            //     () => {
            //         HederaJS.canvas.width =
            //             HederaJS.canvas.parentElement!.clientWidth;
            //         HederaJS.canvas.height =
            //             HederaJS.canvas.parentElement!.clientHeight;
            //     },
            //     true
            // );

            HederaJS.canvas.addEventListener("mousedown", (e: MouseEvent) => {
                HederaJS.mousedownHandlers.forEach((mouseDownHandler) => {
                    mouseDownHandler(e);
                });
            });

            HederaJS.canvas.addEventListener("mousemove", (e: MouseEvent) => {
                HederaJS.mousemoveHandlers.forEach((mouseMoveHandler) => {
                    mouseMoveHandler(e);
                });
            });

            HederaJS.canvas.addEventListener("wheel", (e: MouseEvent) => {
                HederaJS.mousewheelHandlers.forEach((mousewheelHandler) => {
                    mousewheelHandler(e);
                });
            });

            HederaJS.Hedera.update;
            HederaJS.world = new HederaJS.Hedera.World();
            // HederaJS.world.setCameraProjectionPerspective(45, 0.1, 1000);
            HederaJS.world.setTargetCameraOrbitView(0, 0, 0, 20);
            // HederaJS.world.translateCameraOrbitView(0, 0, 0);
            // HederaJS.world.updateCameraOrbitView();
            resolve(true);
        });
    }

    public static onUpdate(updateHandler: any) {
        HederaJS.Hedera.update = updateHandler;
    }

    public static onMouseDown(mousedownHandler: Function) {
        HederaJS.mousedownHandlers.push(mousedownHandler);
    }

    public static onMouseMove(mousemoveHandler: Function) {
        HederaJS.mousemoveHandlers.push(mousemoveHandler);
    }

    public static onMouseWheel(mousewheelHandler: Function) {
        HederaJS.mousewheelHandlers.push(mousewheelHandler);
    }

    /**
     * Download del file dalla URL indicata e caricamento nel world corrente
     * @param params
     * @returns
     */
    public static async fetchAndLoadAssets(params: {
        url: string;
        type?: string;
    }) {
        if (!params.type) {
            params.type = "ZIP";
        }
        HederaJS.world.mainLoopPause();

        if (params.url) {
            return new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", params.url, true);
                xhr.responseType = "arraybuffer";

                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const arrayBuffer = xhr.response;
                        if (params.type === "HPK") {
                            HederaJS.world.loadHAssetsHpk(arrayBuffer);
                        } else if (params.type === "ZIP") {
                            HederaJS.world.loadHAassetsArchive(arrayBuffer);
                        } else {
                            console.error("Invalid asset type:" + params.type);
                        }
                        HederaJS.world.mainLoopResume();
                        resolve(true);
                    } else {
                        reject({
                            status: xhr.status,
                            statusText: xhr.statusText,
                        });
                    }
                };
                xhr.onerror = function () {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                    });
                };

                xhr.send(null);
            });
        }
    }

    public static getDeltaTime() {
        return HederaJS.Hedera.delta_time;
    }

    public static hexToRgb(hex: string) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            var r = parseInt(result[1], 16);
            var g = parseInt(result[2], 16);
            var b = parseInt(result[3], 16);
            return [r, g, b];
        }
        return [0, 0, 0];
    }
}

export interface IHedera {
    World: any;
    Entity: any;
    EventObject: any;
    delta_time: number;
    canvas: any;
    setCanvas(canvas: any): void;
    update(): void;
    start(canvas: any): void;
}

export interface IWorld {
    mainLoopPause(): any;
    mainLoopResume(): any;
    loadHAssetsJson(json: any): any;
    loadHAssetsHpk(arraybuffer: any): any;
    attachComponentRenderer(entity: any): any;
    removeComponentRenderer(entity: any): any;
    setCameraProjectionPerspective(
        fildOfView: any,
        nearPlane: any,
        farPlane: any
    ): any;
    setRotationCameraFirstPersonView(
        yaw: any,
        pitch: any,
        roll: any,
        speed: any
    ): any;
    rotateCameraFirstPersonView(
        yaw: any,
        pitch: any,
        roll: any,
        speed: any
    ): any;
    updateCameraFirstPersonView(smooth: any): any;
    setTargetCameraOrbitView(x: any, y: any, z: any, distance: any): any;
    translateCameraOrbitView(x: any, y: any, speed: any): any;
    updateCameraOrbitView(): any;
    getCameraYaw(): any;
    getCameraPitch(): any;
    getCameraRoll(): any;
    getEntity(name: any): any;
    entityExists(name: any): any;
    translate(entity: any, x: any, y: any, z: any): any;
    setPosition(entity: any, x: any, y: any, z: any): any;
    setSphericalPosition(entity: any, x: any, y: any, distance: any): any;
    setSphericalPositionTarget(
        entity: any,
        x: any,
        y: any,
        z: any,
        target: any,
        distance: any
    ): any;
    rotate(entity: any, x: any, y: any, z: any): any;
    setRotation(entity: any, x: any, y: any, z: any): any;
    followView(entity: any): any;
    firstPersonViewLift(t: any): any;
    firstPersonViewWalk(t: any): any;
    scale(entity: any, x: any, y: any, z: any): any;
    setScale(entity: any, x: any, y: any, z: any): any;
    spritesheetAnimate(entity: any, rowSize: any, speed: any): any;
    spritesheetAnimateRepeat(entity: any, rowSize: any, speed: any): any;
    spritesheetAnimateRow(entity: any, rowSize: any, speed: any): any;
    spritesheetAnimateRowRepeat(entity: any, rowSize: any, speed: any): any;
    spritesheetReset(entity: any, rowSize: any, speed: any): any;
    enableOnScreenSelection(): any;
    selectOnScreen(entity: any, x: any, y: any): any;
    searchOnScreen(x: any, y: any): any;
    changeComponentColor(
        entity: any,
        primitiveIndex: any,
        r: any,
        g: any,
        b: any,
        a: any
    ): any;
    changeComponentAlpha(entity: any, primitiveIndex: any, value: any): any;
    getEntiyCameraAngleRad(entity: any): any;
    getEntiyCameraAngleDeg(entity: any): any;
    getEntiyEntityAngleRad(entity: any, entity2: any): any;
    getEntiyEntityAngleDeg(entity: any, entity2: any): any;
}
