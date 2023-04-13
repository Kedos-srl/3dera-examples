export * from './lib/ngx-hedera-manager.service';
export * from './lib/ngx-hedera.directive';
export * from './lib/ngx-hedera.module';
export interface IHedera {
    World: any;
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
    setCameraProjectionPerspective(fildOfView: any, nearPlane: any, farPlane: any): any;
    setRotationCameraFirstPersonView(yaw: any, pitch: any, roll: any, speed: any): any;
    rotateCameraFirstPersonView(yaw: any, pitch: any, roll: any, speed: any): any;
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
    setSphericalPositionTarget(entity: any, x: any, y: any, z: any, target: any, distance: any): any;
    rotate(entity: any, x: any, y: any, z: any): any;
    setRotation(entity: any, x: any, y: any, z: any): any;
    followView(entity: any): any;
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
    changeComponentColor(entity: any, primitiveIndex: any, r: any, g: any, b: any, a: any): any;
    changeComponentAlpha(entity: any, primitiveIndex: any, value: any): any;
    getEntiyCameraAngleRad(entity: any): any;
    getEntiyCameraAngleDeg(entity: any): any;
    getEntiyEntityAngleRad(entity: any, entity2: any): any;
    getEntiyEntityAngleDeg(entity: any, entity2: any): any;
}
export interface IEventObject {
    /**
     * 1 se attivo 0 se inattivo
     */
    state: number;
    /**
     * Controlla che lo stato sia attivo, ne restituisce lo stato e lo imposta a  per il prossimo ciclo
     */
    isActive(): boolean;
    /**
     * imposta lo stato dell'evento a 1
     */
    activate(): void;
}
export declare class CanvasStatus {
    /**
     * true se il mouse é premuto o se si sta toccando il display
     */
    isMouseDown: boolean;
    /**
     * Posizione x attuale del mouse o del tocco
     */
    mouseX: number;
    /**
     * Posizione y attuale del mouse o del tocco
     */
    mouseY: number;
    /**
     * Posizione x dell'ultimo click / tocco
     */
    clickX: number;
    /**
     * Posizione y dell'ultimo click / tocco
     */
    clickY: number;
    /**
     * Posizione x dell'ultimo doppio click
     */
    doubleClickX: number;
    /**
     * Posizione y dell'ultimo doppio click
     */
    doubleClickY: number;
    /**
     * Attivo se il mouse o lo sfioramento sul display sta cambiando direzione
     */
    mouseMoveEvent: IEventObject;
    /**
     * Attivo al click o ap sul display
     */
    mouseClickEvent: IEventObject;
    /**
     * Attivo al doppio click
     */
    mouseDoubleClickEvent: IEventObject;
    /**
     * Tempo di esecuzione in secondi
     */
    elapsedTime: number;
}
export declare class Scene {
    active?: boolean;
    id: string;
    rooms?: string[];
    widgets?: string[];
    sprites?: string[];
}
