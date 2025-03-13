import * as THREE from "three";

export class ThreexGrass {
    static createGrassTufts(scene, positions, texture) {
        // create the initial geometry
        let planeWidth = 0.4;
        let planeHeight = 0.2;
        let geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

        let material = new THREE.MeshPhongMaterial({
            map: texture,
            alphaTest: 0.7,
        });

        // create each tuft and merge their geometry for performance
        //let mergedGeo = new THREE.Geometry();
        let mergedGeo = new THREE.Object3D();

        for (let i = 0; i < positions.length; i++) {
            let position = positions[i];
            position.y = planeHeight/2;
            let baseAngle = Math.PI * 2 * Math.random();

            let nPlanes = 2;
            for (let j = 0; j < nPlanes; j++) {
                let angle = baseAngle + (j * Math.PI) / nPlanes;

                // First plane
                let object3d_f = new THREE.Mesh(geometry, material);
                object3d_f.rotateY(angle);
                object3d_f.position.copy(position);
                mergedGeo.add(object3d_f);

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

