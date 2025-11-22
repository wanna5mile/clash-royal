const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);


const createScene = () => {
const scene = new BABYLON.Scene(engine);


// Camera
const camera = new BABYLON.ArcRotateCamera(
"camera",
Math.PI / 2,
Math.PI / 3,
10,
BABYLON.Vector3.Zero(),
scene
);
camera.attachControl(canvas, true);


// Light
const light = new BABYLON.HemisphericLight(
"light",
new BABYLON.Vector3(0, 1, 0),
scene
);


// Ground
const ground = BABYLON.MeshBuilder.CreateGround("ground", {
width: 10,
height: 10
}, scene);


// Box
const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
box.position.y = 1;


return scene;
};


const scene = createScene();


engine.runRenderLoop(() => {
scene.render();
});


window.addEventListener("resize", () => {
engine.resize();
});
