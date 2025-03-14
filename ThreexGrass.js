import * as THREE from "three";
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

export class ThreexGrass {
    static createGrassTufts(scene, positions, texture, size) {

        // the initial geometry
        let geometry = new THREE.PlaneGeometry(size.w, size.h);
        // to merge the geometries for performance
        let mergedGeo = new THREE.Object3D();

        let material = new THREE.MeshPhongMaterial({
            map: texture,
            alphaTest: 0.7,
        });


        for (let i = 0; i < positions.length; i++) {
            let position = positions[i];
            position.y = size.y;
            let baseAngle = Math.PI * 2 * Math.random();

            let nPlanes = 2;
            for (let j = 0; j < nPlanes; j++) {
                let angle = baseAngle + (j * Math.PI) / nPlanes;

                // First plane
                let object3d_a = new THREE.Mesh(geometry, material);
                object3d_a.rotateY(angle);
                object3d_a.position.copy(position);
                mergedGeo.add(object3d_a);

                // The other side of the plane
                let object3d_b = new THREE.Mesh(geometry, material);
                object3d_b.rotateY(angle + Math.PI);
                object3d_b.position.copy(position);
                mergedGeo.add(object3d_b);
            }
        }

        scene.add(mergedGeo);
    }
}

/*

import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';

// 1. Create individual PlaneGeometry instances
const plane1 = new THREE.PlaneGeometry(10, 10);
const plane2 = new THREE.PlaneGeometry(5, 5);
const plane3 = new THREE.PlaneGeometry(8, 8);

// 2. Store geometries in an array
const geometries = [plane1, plane2, plane3];

// 3. Merge geometries using BufferGeometryUtils
const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);

// 4. Create a mesh with the merged geometry
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mergedMesh = new THREE.Mesh(mergedGeometry, material);

// 5. Add the mesh to the scene
const scene = new THREE.Scene();
scene.add(mergedMesh);

//Render the scene (example with a renderer and camera)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

*/

