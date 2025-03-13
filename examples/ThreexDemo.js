import * as THREE from "three";
import { ThreexGrass } from "../ThreexGrass.js";
import Stats from "three/addons/libs/stats.module.js";

export class ThreexDemo {
    constructor() {
        this.nTufts;
        this.position;
        this.baseUrl = "../";

        this.renderer;
        this.camera;
        this.scene;

        this.clock = new THREE.Clock();
        this.delta = this.clock.getDelta();
        this.mouse = { x: 0, y: 0 };

        this.stats = new Stats();
        this.stats.domElement.style =
            "position:absolute; left:0; bottom: 0; cursor: pointer; opacity: 0.9; z-index: 10000;";
        this.stats.domElement.id = "StatsContainer";
        document.body.appendChild(this.stats.domElement);

        this.textureLoader = new THREE.TextureLoader();
        this.textureLoaderB = new THREE.TextureLoader();

        this.loadTextures();
    }

    loadTextures() {
        let textures = {};
        let loadedCount = 0;
        let onLoad = function (item) {
            let tUrl = item.image.currentSrc;
            let tName = tUrl.substring(tUrl.lastIndexOf("/") + 1);

            textures[tName] = item;
            loadedCount++;
            if (loadedCount === 4) {
                this.hotItUp(textures);
            }
        }.bind(this);
        let onError = function (item) {
            console.log(item);
        };
        this.textureLoader.onLoad = onLoad;

        let textureUrl_1 = this.baseUrl + "images/grass01.png";
        this.textureLoader.load(textureUrl_1, onLoad, undefined, onError);
        let textureUrl_2 = this.baseUrl + "images/grass02.png";
        this.textureLoader.load(textureUrl_2, onLoad, undefined, onError);
        let textureUrl_3 = this.baseUrl + "images/flowers01.png";
        this.textureLoader.load(textureUrl_3, onLoad, undefined, onError);
        let textureUrl_4 = this.baseUrl + "images/flowers02.png";
        this.textureLoader.load(textureUrl_4, onLoad, undefined, onError);
    }

    hotItUp(textures) {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor("lightblue", 1);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
        this.camera.position.z = 1;

        // add a ambient light
        let ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
        this.scene.add(ambientLight);

        // add a light in front
        let directionalLightA = new THREE.DirectionalLight("white", 1);
        directionalLightA.position.set(0.5, 0.5, 2);
        this.scene.add(directionalLightA);

        // add a light behind
        let directionalLightB = new THREE.DirectionalLight("white", 1);
        directionalLightB.position.set(-0.5, -0.5, -2);
        this.scene.add(directionalLightB);

        // ground
        let textureUrl = this.baseUrl + "images/grass_terrain.jpg";
        let texture = this.textureLoaderB.load(textureUrl);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = 20;
        texture.repeat.y = 20;
        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        // ground mesh
        let geometry = new THREE.PlaneGeometry(20, 20);
        let material = new THREE.MeshPhongMaterial({
            map: texture,
        });
        let ground = new THREE.Mesh(geometry, material);
        ground.rotateX(-Math.PI / 2);
        this.scene.add(ground);

        // grass01
        let nTufts_g1 = 5000;
        let positions_g1 = new Array(nTufts_g1);
        for (let i = 0; i < nTufts_g1; i++) {
            let position = new THREE.Vector3();
            position.x = (Math.random() - 0.5) * 20;
            position.z = (Math.random() - 0.5) * 20;
            positions_g1[i] = position;
        }
        ThreexGrass.createGrassTufts(this.scene, positions_g1, textures["grass01.png"]);

        // grass02
        let nTufts_g2 = 5000;
        let positions_g2 = new Array(nTufts_g2);
        for (let i = 0; i < nTufts_g2; i++) {
            let position = new THREE.Vector3();
            position.x = (Math.random() - 0.5) * 20;
            position.z = (Math.random() - 0.5) * 20;
            positions_g2[i] = position;
        }
        ThreexGrass.createGrassTufts(this.scene, positions_g2, textures["grass02.png"]);

        // flowers01
        let nTufts_f1 = 100;
        let positions_f1 = new Array(nTufts_f1);
        for (let i = 0; i < nTufts_f1; i++) {
            let position = new THREE.Vector3();
            position.x = (Math.random() - 0.5) * 20;
            position.z = (Math.random() - 0.5) * 20;
            positions_f1[i] = position;
        }
        ThreexGrass.createGrassTufts(this.scene, positions_f1, textures["flowers01.png"]);

        // flowers02
        let nTufts_f2 = 100;
        let positions_f2 = new Array(nTufts_f2);
        for (let i = 0; i < nTufts_f2; i++) {
            let position = new THREE.Vector3();
            position.x = (Math.random() - 0.5) * 20;
            position.z = (Math.random() - 0.5) * 20;
            positions_f2[i] = position;
        }
        ThreexGrass.createGrassTufts(this.scene, positions_f2, textures["flowers02.png"]);

        // for camera annoyance
        document.addEventListener(
            "mousemove",
            function (event) {
                this.mouse.x = event.clientX / window.innerWidth - 0.5;
                this.mouse.y = event.clientY / window.innerHeight - 0.5;
            }.bind(this),
            false
        );

        this.animate();
    }

    animate = function (nowMsec) {
        this.delta = this.clock.getDelta();

        this.camera.position.x += (this.mouse.x * 2 - this.camera.position.x) * (this.delta * 3);
        this.camera.position.y += (this.mouse.y * 2 - this.camera.position.y) * (this.delta * 3);
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }.bind(this);
}
