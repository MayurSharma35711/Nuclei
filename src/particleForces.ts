import { Particle, ParticleType } from "./particle";
// particle type shouldn't be required except for creation, since the particle 
// class should use the type to get all relevant info

// particle utilities functions

function getDistance (particle1: Particle, particle2: Particle): number {
    let dx = particle1.x - particle2.x;
    let dy = particle1.y - particle2.y;
    let dz = particle1.z - particle2.z;
    let dr2 = (dx*dx + dy*dy + dz*dz);
    return Math.pow(dr2, 0.5);
}

// particle geometric things 

function intersectCheck (particle1: Particle, particle2: Particle): boolean {
  return getDistance(particle1, particle2) < 2 * Particle.RADIUS;
}

export function anyIntersections (particles: Particle[]): boolean {
  let particle1 = particles[0];
  for (let i = 1; i < particles.length; i++) {
    if (intersectCheck(particle1, particles[i])) {
      console.log(particle1); // for debugging purposes, might want to make a print function for particles
      console.log(particles[i]);
      console.log(getDistance(particle1, particles[i]));
      return true;
    }
  }
  if (particles.length > 2) {
    return anyIntersections(particles.slice(1));
  }
  return false;
}

// particle physics functions
// Ideas: perhaps instead of pairwise calculations, we could calculate via fields?

function EMPotential (particle1: Particle, particle2: Particle): number {
  let dr = getDistance(particle1, particle2);
  return 1/(dr); // this formula is tentative
  // what exact potential are you looking for? Based on that, this needs to be changed
}

function StrongPotential (particle1: Particle, particle2: Particle): number {
  let dr = getDistance(particle1, particle2);
  let pionMass = 132.5; // MeV 
  return -Math.pow(Math.E, -pionMass*dr)/(dr*dr); // this formula is tentative
  // pretty sure this primarily holds for quarkonium, and might not be accurate for nucleus
  // do more research to find the actual formula
}

function WeakPotential (particle1: Particle, particle2: Particle): number {
  let dr = getDistance(particle1, particle2);
  let WZmesonMass = 1000*(91+91+80)/3; // Average mass of W+, W-, Z 
  return Math.pow(Math.E, -WZmesonMass*dr)/(dr*dr); // this formula is tentative
  // Not sure if this is the actual formula, so do some more research to find it
}

export class Field { 
  // not required that this is a class, but I thought it might be cleaner to understand? 
  // basically a class version of all the force functions, so that it looks more like a field
  // in this way, it should be a bit easier to recurse over for the actual minimization algorithm
  private particleList: Particle[];
  constructor(particle: Particle){
    this.particleList = [];
    this.add(particle);
  }
  add(particle: Particle): boolean {
    let tempArr: Particle[] = [];
    for (let i = 0; i < tempArr.length; i++) {
      tempArr.push(this.particleList[i]);
    }
    tempArr.push(particle);
    if (anyIntersections(tempArr)) {
      // should this be done here or when add is actually called? 
      // might save computation steps if you do it outside instead
      return false;
    } else {
      this.particleList.push(particle);
      return true;
    }
  }
  pull(index: number): boolean | Particle[] {
    if (index > this.particleList.length + 1) return false;
    else {
      let newList: Particle[] = [];
      for (let i = 0; i < this.particleList.length; i++) {
        if (i === index) continue;
        else newList.push(this.particleList[i]);
      }
      return newList;
    }
  }
  getParticleEMPotential(particle: Particle, particleList: Particle[]): number {
    if (particle.type === ParticleType.NEUTRON) {
      return 0;
    }
    let potential = 0;
    for (let i = 0; i < particleList.length; i++) {
      potential += EMPotential(particle, particleList[i]);
    }
    return potential;
  }
  getParticleStrongPotential(particle: Particle, particleList: Particle[]): number {
    let potential = 0;
    for (let i = 0; i < particleList.length; i++) {
      potential += StrongPotential(particle, particleList[i]);
    }
    return potential;
  }
  getParticleWeakPotential(particle: Particle, particleList: Particle[]): number {
    let potential = 0;
    for (let i = 0; i < particleList.length; i++) {
      potential += WeakPotential(particle, particleList[i]);
    }
    return potential;
  }
  getParticlePotential(particle: Particle, particleList: Particle[]): number {
    let potential = this.getParticleEMPotential(particle, particleList);
    potential    += this.getParticleWeakPotential(particle, particleList);
    potential    += this.getParticleStrongPotential(particle, particleList);
    console.log(potential);
    return potential;
  }
  getSystemPotential(): number { 
    // have to think about whether this function actually makes sense 
    // in terms of physics meaning and comp sci implementation
    let potential: number = 0;
    for (let i = 0; i < this.particleList.length; i++) {
      let curList = this.pull(i);
      if (curList === false) throw "howwww.... ";
      potential += this.getParticlePotential(this.particleList[i], <Particle[]>curList);
    }
    return potential;
  }
}