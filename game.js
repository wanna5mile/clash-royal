// Save this as game.js

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // Optional: subtle global light if you want mood
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.3;

    // Camera (Orthographic for 2D look)
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -10), scene);
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    camera.orthoLeft = -10;
    camera.orthoRight = 10;
    camera.orthoTop = 10;
    camera.orthoBottom = -10;

    // Player sprite as a plane
    const player = BABYLON.MeshBuilder.CreatePlane("player", {width:1, height:1}, scene);
    const playerMat = new BABYLON.StandardMaterial("playerMat", scene);
    playerMat.emissiveTexture = new BABYLON.Texture("assets/sprites/player.png", scene); // your sprite
    player.material = playerMat;

    player.position = new BABYLON.Vector3(0, 0, 0);

    // Simple movement variables
    const speed = 0.1;
    const keys = {};

    // Key down/up events
    window.addEventListener("keydown", (e) => { keys[e.key.toLowerCase()] = true; });
    window.addEventListener("keyup", (e) => { keys[e.key.toLowerCase()] = false; });

    // Game loop
    scene.onBeforeRenderObservable.add(() => {
        if (keys['w']) player.position.y += speed;
        if (keys['s']) player.position.y -= speed;
        if (keys['a']) player.position.x -= speed;
        if (keys['d']) player.position.x += speed;
    });

    return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});
