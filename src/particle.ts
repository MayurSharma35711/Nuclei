// Basic Particle Stuff
import * as THREE from 'three';
// var graphics = require("./graphics");

export const DISP_SCALE: number = 30;

export enum ParticleType {
  PROTON,
  NEUTRON,
  OTHER // Maybe at some point we include custom particles? that would be cool 
}

export class Particle {
  public x: number;
  public y: number;
  public z: number;
  private dispX: number;
  private dispY: number;
  private dispZ: number;

  public type: ParticleType;
  public chargeEM: number;
  // strong force, weak force, mass and perhaps other values may need to be recorded

  static readonly RADIUS = 1; // this one is used for calculation purposes
  private static readonly DISP_SCALE = DISP_SCALE; // this one is used for graphics purposes

  public particleMesh: THREE.Mesh<THREE.SphereGeometry,THREE.MeshPhongMaterial>;

  constructor(x: number, y: number, z: number, type: ParticleType){
    this.x = x;
    this.y = y;
    this.z = z;
    this.dispX = this.x * Particle.DISP_SCALE;
    this.dispY = this.y * Particle.DISP_SCALE;
    this.dispZ = this.z * Particle.DISP_SCALE;
    this.type = type;
    if (this.type === ParticleType.NEUTRON) this.chargeEM = 0;
    else if (this.type === ParticleType.PROTON) this.chargeEM = 1;
    this.createParticle(this.type);
  }
  private createParticle(type: ParticleType) {
    let geometry = new THREE.SphereGeometry(Particle.RADIUS * Particle.DISP_SCALE);
    let material = new THREE.MeshPhongMaterial( {wireframe:false} );
    this.particleMesh = new THREE.Mesh( geometry, material );
    this.particleMesh.position.set(this.dispX, this.dispY, this.dispZ);
    if (type === ParticleType.NEUTRON) this.particleMesh.material.color.setHex( 0x0000ff );
    else if (type === ParticleType.PROTON) this.particleMesh.material.color.setHex( 0xff0000 );
    this.particleMesh.castShadow = false;
    this.particleMesh.receiveShadow = false;
  }
}