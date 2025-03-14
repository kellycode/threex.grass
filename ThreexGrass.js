import * as THREE from "three";

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

