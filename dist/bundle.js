/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


/***/ }),

/***/ "./src/graphics.ts":
/*!*************************!*\
  !*** ./src/graphics.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Scene\": () => /* binding */ Scene\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./particle */ \"./src/particle.ts\");\n\n\nclass Scene {\n    init() {\n        this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ logarithmicDepthBuffer: false });\n        this.renderer.shadowMap.enabled = true;\n        document.body.style.marginTop = \"0px\";\n        document.body.style.marginLeft = \"0px\";\n        document.body.style.marginBottom = \"0px\";\n        document.body.style.marginRight = \"0px\";\n        document.body.appendChild(this.renderer.domElement);\n        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\n        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);\n        // this.controls = new OrbitControls( this.camera, this.renderer.domElement );\n        // Have to look into this package more at some point, or perhaps use another package altogether\n        this.xpos = 0;\n        this.ypos = 0;\n        this.zpos = _particle__WEBPACK_IMPORTED_MODULE_1__.DISP_SCALE * 10;\n        this.speed = _particle__WEBPACK_IMPORTED_MODULE_1__.DISP_SCALE / 20;\n        this.euler = new three__WEBPACK_IMPORTED_MODULE_0__.Euler(0, 1, 1.57, 'XYZ');\n        this.rotSpeed = 0.001;\n        // this.scene.add(this.testBox());\n        let ambient_light = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0xffffff, .7);\n        this.scene.add(ambient_light);\n    }\n    add(object) {\n        this.scene.add(object);\n    }\n    animateLoop() {\n        requestAnimationFrame(this.animateLoop.bind(this));\n        this.camera.updateProjectionMatrix();\n        this.camera.position.set(this.xpos, this.ypos, this.zpos);\n        // if (this.camera.position.x + this.camera.position.z < 100) this.renderer.setClearColor( 0x000115, 1);\n        // else this.renderer.setClearColor( \"red\", 1);\n        this.renderer.setPixelRatio(window.devicePixelRatio);\n        let canvasW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;\n        let canvasH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;\n        this.renderer.setSize(canvasW, canvasH);\n        this.renderer.render(this.scene, this.camera);\n    }\n    onMouseMove(event) {\n        var movementX = event.movementX;\n        var movementY = event.movementY;\n        this.euler.setFromQuaternion(this.camera.quaternion);\n        this.euler.y -= movementX * this.rotSpeed;\n        this.euler.x -= movementY * this.rotSpeed;\n        this.euler.x = Math.max(-Math.PI * 2, Math.min(Math.PI * 2, this.euler.x));\n        this.camera.quaternion.setFromEuler(this.euler);\n    }\n    // This needs to be updated for the orbital code \n    updatePos(event) {\n        // keyboard input has to be smoothened and cleaned up later\n        let angle;\n        switch (event.key) {\n            case \"w\":\n                this.zpos -= this.speed * Math.cos(this.camera.rotation.y);\n                this.xpos -= this.speed * Math.sin(this.camera.rotation.y);\n                break;\n            case \"a\":\n                this.xpos -= this.speed * Math.cos(this.camera.rotation.y);\n                this.zpos += this.speed * Math.sin(this.camera.rotation.y);\n                break;\n            case \"s\":\n                this.zpos += this.speed * Math.cos(this.camera.rotation.y);\n                this.xpos += this.speed * Math.sin(this.camera.rotation.y);\n                break;\n            case \"d\":\n                this.xpos += this.speed * Math.cos(this.camera.rotation.y);\n                this.zpos -= this.speed * Math.sin(this.camera.rotation.y);\n                break;\n            case \"r\":\n                this.ypos += this.speed;\n                break;\n            case \"f\":\n                this.ypos -= this.speed;\n                break;\n            default:\n                break;\n        }\n        this.camera.position.set(this.xpos, this.ypos, this.zpos);\n    }\n    testBox() {\n        let geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(50, 50, 50);\n        let material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({ wireframe: true });\n        let mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\n        mesh.material.color.setHex(0x00ff00);\n        mesh.castShadow = false;\n        mesh.receiveShadow = false;\n        return mesh;\n    }\n}\n\n\n//# sourceURL=webpack://nuclei/./src/graphics.ts?");

/***/ }),

/***/ "./src/particle.ts":
/*!*************************!*\
  !*** ./src/particle.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DISP_SCALE\": () => /* binding */ DISP_SCALE,\n/* harmony export */   \"ParticleType\": () => /* binding */ ParticleType,\n/* harmony export */   \"Particle\": () => /* binding */ Particle\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n// Basic Particle Stuff\n\n// var graphics = require(\"./graphics\");\nconst DISP_SCALE = 30;\nvar ParticleType;\n(function (ParticleType) {\n    ParticleType[ParticleType[\"PROTON\"] = 0] = \"PROTON\";\n    ParticleType[ParticleType[\"NEUTRON\"] = 1] = \"NEUTRON\";\n    ParticleType[ParticleType[\"OTHER\"] = 2] = \"OTHER\"; // Maybe at some point we include custom particles? that would be cool \n})(ParticleType || (ParticleType = {}));\nclass Particle {\n    constructor(x, y, z, type) {\n        this.x = x;\n        this.y = y;\n        this.z = z;\n        this.dispX = this.x * Particle.DISP_SCALE;\n        this.dispY = this.y * Particle.DISP_SCALE;\n        this.dispZ = this.z * Particle.DISP_SCALE;\n        this.type = type;\n        if (this.type === ParticleType.NEUTRON)\n            this.chargeEM = 1;\n        else if (this.type === ParticleType.PROTON)\n            this.chargeEM = 0;\n        this.createParticle(this.type);\n    }\n    createParticle(type) {\n        let geometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(Particle.RADIUS * Particle.DISP_SCALE);\n        let material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({ wireframe: false });\n        this.particleMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\n        this.particleMesh.position.set(this.dispX, this.dispY, this.dispZ);\n        if (type === ParticleType.NEUTRON)\n            this.particleMesh.material.color.setHex(0x0000ff);\n        else if (type === ParticleType.PROTON)\n            this.particleMesh.material.color.setHex(0xff0000);\n        this.particleMesh.castShadow = false;\n        this.particleMesh.receiveShadow = false;\n    }\n}\n// strong force, weak force, mass and perhaps other values may need to be recorded\nParticle.RADIUS = 1; // this one is used for calculation purposes\nParticle.DISP_SCALE = DISP_SCALE; // this one is used for graphics purposes\n\n\n//# sourceURL=webpack://nuclei/./src/particle.ts?");

/***/ }),

/***/ "./src/particleForces.ts":
/*!*******************************!*\
  !*** ./src/particleForces.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Field\": () => /* binding */ Field,\n/* harmony export */   \"anyIntersections\": () => /* binding */ anyIntersections\n/* harmony export */ });\n/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ \"./src/particle.ts\");\n\n// particle type shouldn't be required except for creation, since the particle \n// class should use the type to get all relevant info\n// particle utilities functions\nfunction getDistance(particle1, particle2) {\n    let dx = particle1.x - particle2.x;\n    let dy = particle1.y - particle2.y;\n    let dz = particle1.z - particle2.z;\n    let dr2 = (dx * dx + dy * dy + dz * dz);\n    return Math.pow(dr2, 0.5);\n}\n// particle physics functions\n// Ideas: perhaps instead of pairwise calculations, we could calculate via fields?\nfunction EMForce(particle1, particle2) {\n    let dr = getDistance(particle1, particle2);\n    return particle1.chargeEM * particle2.chargeEM / (dr * dr); // this formula is tentative \n    // look into exact definition used for this function and do some math to fix it up \n}\nfunction EMPotential(particle1, particle2) {\n    let dr = getDistance(particle1, particle2);\n    return 1 / (dr); // this formula is tentative\n    // what exact potential are you looking for? Based on that, this needs to be changed\n}\nfunction StrongForce(particle1, particle2) {\n    let dr = getDistance(particle1, particle2);\n    let pionMass = 132.5; // MeV \n    return Math.pow(Math.E, -pionMass * dr) / (dr * dr); // this formula is tentative\n    // do some more research to get any sort of actual force. The value above is not even a force,\n    // I believe it is actually the Yukawa potential which only holds for quarkonium\n}\nfunction StrongPotential(particle1, particle2) {\n    let dr = getDistance(particle1, particle2);\n    let pionMass = 132.5; // MeV \n    return -Math.pow(Math.E, -pionMass * dr) / (dr * dr); // this formula is tentative\n    // pretty sure this primarily holds for quarkonium, and might not be accurate for nucleus\n    // do more research to find the actual formula\n}\nfunction WeakForce(particle1, particle2) {\n    let dr = getDistance(particle1, particle2);\n    let WZmesonMass = 1000 * (91 + 91 + 80) / 3; // Average mass of W+, W-, Z \n    return Math.pow(Math.E, -WZmesonMass * dr) / (dr * dr); // this formula is tentative\n    // This one should be (hopefully) better documented than that of the strong force\n    // Currently, this is a yukawa formula looking thing and not actually a force.\n}\nfunction WeakPotential(particle1, particle2) {\n    let dr = getDistance(particle1, particle2);\n    let WZmesonMass = 1000 * (91 + 91 + 80) / 3; // Average mass of W+, W-, Z \n    return Math.pow(Math.E, -WZmesonMass * dr) / (dr * dr); // this formula is tentative\n    // Not sure if this is the actual formula, so do some more research to find it\n}\nclass Field {\n    constructor(particle) {\n        this.particleList = [];\n        this.add(particle);\n    }\n    add(particle) {\n        let tempArr = [];\n        for (let i = 0; i < tempArr.length; i++) {\n            tempArr.push(this.particleList[i]);\n        }\n        tempArr.push(particle);\n        if (anyIntersections(tempArr)) {\n            // should this be done here or when add is actually called? \n            // might save computation steps if you do it outside instead\n            return false;\n        }\n        else {\n            this.particleList.push(particle);\n            return true;\n        }\n    }\n    pull(index) {\n        if (index > this.particleList.length + 1)\n            return false;\n        else {\n            let newList = [];\n            for (let i = 0; i < this.particleList.length; i++) {\n                if (i === index)\n                    continue;\n                else\n                    newList.push(this.particleList[i]);\n            }\n            return newList;\n        }\n    }\n    getParticleEMPotential(particle, particleList) {\n        if (particle.type === _particle__WEBPACK_IMPORTED_MODULE_0__.ParticleType.NEUTRON) {\n            return 0;\n        }\n        let potential = 0;\n        for (let i = 0; i < particleList.length; i++) {\n            potential += EMPotential(particle, particleList[i]);\n        }\n        return potential;\n    }\n    getParticleStrongPotential(particle, particleList) {\n        let potential = 0;\n        for (let i = 0; i < particleList.length; i++) {\n            potential += StrongPotential(particle, particleList[i]);\n        }\n        return potential;\n    }\n    getParticleWeakPotential(particle, particleList) {\n        let potential = 0;\n        for (let i = 0; i < particleList.length; i++) {\n            potential += WeakPotential(particle, particleList[i]);\n        }\n        return potential;\n    }\n    getParticlePotential(particle, particleList) {\n        let potential = this.getParticleEMPotential(particle, particleList);\n        potential += this.getParticleWeakPotential(particle, particleList);\n        potential += this.getParticleStrongPotential(particle, particleList);\n        console.log(potential);\n        return potential;\n    }\n    getSystemPotential() {\n        // have to think about whether this function actually makes sense \n        // in terms of physics meaning and comp sci implementation\n        let potential = 0;\n        for (let i = 0; i < this.particleList.length; i++) {\n            let curList = this.pull(i);\n            if (curList === false)\n                throw \"howwww.... \";\n            potential += this.getParticlePotential(this.particleList[i], curList);\n        }\n        return potential;\n    }\n}\n// particle geometric things \nfunction intersectCheck(particle1, particle2) {\n    return getDistance(particle1, particle2) < 2 * _particle__WEBPACK_IMPORTED_MODULE_0__.Particle.RADIUS;\n}\nfunction anyIntersections(particles) {\n    let particle1 = particles[0];\n    for (let i = 1; i < particles.length; i++) {\n        if (intersectCheck(particle1, particles[i])) {\n            console.log(particle1); // for debugging purposes, might want to make a print function for particles\n            console.log(particles[i]);\n            console.log(getDistance(particle1, particles[i]));\n            return true;\n        }\n    }\n    if (particles.length > 2) {\n        return anyIntersections(particles.slice(1));\n    }\n    return false;\n}\n\n\n//# sourceURL=webpack://nuclei/./src/particleForces.ts?");

/***/ }),

/***/ "./src/test.ts":
/*!*********************!*\
  !*** ./src/test.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ \"./src/particle.ts\");\n/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphics */ \"./src/graphics.ts\");\n/* harmony import */ var _particleForces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./particleForces */ \"./src/particleForces.ts\");\n\n\n\nlet proton1 = new _particle__WEBPACK_IMPORTED_MODULE_0__.Particle(0, 0, 0, _particle__WEBPACK_IMPORTED_MODULE_0__.ParticleType.PROTON);\nlet neutron1 = new _particle__WEBPACK_IMPORTED_MODULE_0__.Particle(1, 1.733, 1, _particle__WEBPACK_IMPORTED_MODULE_0__.ParticleType.NEUTRON);\nlet neutron2 = new _particle__WEBPACK_IMPORTED_MODULE_0__.Particle(2, 0, 0, _particle__WEBPACK_IMPORTED_MODULE_0__.ParticleType.NEUTRON);\nlet proton2 = new _particle__WEBPACK_IMPORTED_MODULE_0__.Particle(3, 1.733, 0, _particle__WEBPACK_IMPORTED_MODULE_0__.ParticleType.PROTON);\nlet particles = [proton1, neutron1, neutron2, proton2];\nlet field = new _particleForces__WEBPACK_IMPORTED_MODULE_2__.Field(proton1);\nfield.add(neutron1);\nfield.add(neutron2);\nfield.add(proton2);\nlet scene = new _graphics__WEBPACK_IMPORTED_MODULE_1__.Scene();\nscene.init();\nif (_particleForces__WEBPACK_IMPORTED_MODULE_2__.anyIntersections(particles)) {\n    throw \"Particles are intersecting\";\n}\nelse {\n    for (let i = 0; i < particles.length; i++) {\n        scene.add(particles[i].particleMesh);\n    }\n    console.log(\"Potential:: \" + field.getSystemPotential());\n}\nif (!scene.renderer) {\n    throw \"no renderer\";\n}\nelse {\n    // This needs to be updated for the orbital code \n    window.addEventListener(\"keypress\", function (event) {\n        scene.updatePos(event);\n        // Cancel the default action to avoid it being handled twice\n        // event.preventDefault();\n    }, true);\n    window.addEventListener(\"mousemove\", function (event) {\n        scene.onMouseMove(event);\n    });\n    scene.animateLoop();\n}\n\n\n//# sourceURL=webpack://nuclei/./src/test.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/test.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;