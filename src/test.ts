import { Particle, ParticleType } from "./particle";
import * as Graphics from "./graphics";
import * as Forces from "./particleForces"


let proton1 = new Particle(0,0,0, ParticleType.PROTON);
let neutron1 = new Particle(1,1.733,1, ParticleType.NEUTRON);
let neutron2 = new Particle(2,0,0, ParticleType.NEUTRON);
let proton2 = new Particle(3,1.733,0, ParticleType.PROTON);

let particles = [proton1, neutron1, neutron2, proton2];

let field = new Forces.Field(proton1);
field.add(neutron1);
field.add(neutron2);
field.add(proton2);

let scene = new Graphics.Scene();
scene.init();

if (Forces.anyIntersections(particles)) {
    throw "Particles are intersecting";
} else {
    for (let i = 0; i < particles.length; i++) {
        scene.add(particles[i].particleMesh);
    }
    console.log("Potential:: " + field.getSystemPotential());
}

if(!scene.renderer) {
    throw "no renderer";
} else {
    // This needs to be updated for the orbital code 
    window.addEventListener("keypress", function (event) {
        scene.updatePos(event);
        // Cancel the default action to avoid it being handled twice
        // event.preventDefault();
    }, true);
    
    window.addEventListener("mousemove",function(event){
        scene.onMouseMove(event);
    })
    scene.animateLoop();
}
