import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import {DISP_SCALE} from './particle'


export class Scene {
    public renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private xpos: number;
    private ypos: number;
    private zpos: number;
    private speed: number;
    private rotSpeed: number;
    private euler: THREE.Euler;
    private controls: OrbitControls;

    public init() {
        this.renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: false });
        this.renderer.shadowMap.enabled = true;

        document.body.style.marginTop = "0px";
        document.body.style.marginLeft = "0px";
        document.body.style.marginBottom = "0px";
        document.body.style.marginRight = "0px";
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
    
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
        // this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        // Have to look into this package more at some point, or perhaps use another package altogether
        
        this.xpos = 0;
        this.ypos = 0;
        this.zpos = DISP_SCALE*10;
        this.speed = DISP_SCALE/20;
        this.euler = new THREE.Euler( 0, 1, 1.57, 'XYZ' );
        this.rotSpeed = 0.001;

        // this.scene.add(this.testBox());
        
        let ambient_light = new THREE.AmbientLight( 0xffffff, .7 );
        this.scene.add( ambient_light );
    
        
    }
    public add(object: THREE.Object3D) {
        this.scene.add(object);
    }
    public animateLoop(){
      requestAnimationFrame( this.animateLoop.bind(this) );
      this.camera.updateProjectionMatrix();
      this.camera.position.set(this.xpos, this.ypos, this.zpos);
      // if (this.camera.position.x + this.camera.position.z < 100) this.renderer.setClearColor( 0x000115, 1);
      // else this.renderer.setClearColor( "red", 1);
      this.renderer.setPixelRatio( window.devicePixelRatio );

      let canvasW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let canvasH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.renderer.setSize(canvasW,canvasH);

      this.renderer.render(this.scene, this.camera);
    }
    public onMouseMove(event: MouseEvent) {
      var movementX = event.movementX;
      var movementY = event.movementY;
  
      this.euler.setFromQuaternion(this.camera.quaternion);
  
      this.euler.y -= movementX * this.rotSpeed;
      this.euler.x -= movementY * this.rotSpeed;

      this.euler.x = Math.max(-Math.PI*2, Math.min(Math.PI*2, this.euler.x));
  
      this.camera.quaternion.setFromEuler(this.euler);
    }
    // This needs to be updated for the orbital code 
    public updatePos(event: KeyboardEvent){
      // keyboard input has to be smoothened and cleaned up later
      let angle;
      switch (event.key) {
        case "w":
          this.zpos -= this.speed*Math.cos(this.camera.rotation.y);
          this.xpos -= this.speed*Math.sin(this.camera.rotation.y);
          break;
        case "a":
          this.xpos -= this.speed*Math.cos(this.camera.rotation.y); 
          this.zpos += this.speed*Math.sin(this.camera.rotation.y);
          break;
        case "s":
          this.zpos += this.speed*Math.cos(this.camera.rotation.y); 
          this.xpos += this.speed*Math.sin(this.camera.rotation.y);
          break;
        case "d":
          this.xpos += this.speed*Math.cos(this.camera.rotation.y); 
          this.zpos -= this.speed*Math.sin(this.camera.rotation.y);
          break;
        case "r":
          this.ypos += this.speed;
          break;
        case "f":
          this.ypos -= this.speed;
          break;
        default:
          break;
      }
      this.camera.position.set(this.xpos,this.ypos,this.zpos);
    }
    private testBox(): THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial>{
      let geometry = new THREE.BoxGeometry( 50, 50, 50 );
      let material = new THREE.MeshPhongMaterial( {wireframe:true} );
      let mesh = new THREE.Mesh( geometry, material );
      mesh.material.color.setHex( 0x00ff00 );
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      return mesh;
    }
}