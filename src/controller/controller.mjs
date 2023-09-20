import Sheeps from "../class/Sheeps.mjs";
const sheeps = new Sheeps();

class GetController {
    constructor() {
        this.name = "GetController";
    }
    async get(request, response) {
        console.log("\n\nControl:\nget control!");
        // console.log(sheeps);
        // let data = sheeps.sheeps;
        // console.log(data);
        response.send(JSON.stringify(sheeps));
    }
}

class PostController {
    constructor() {
        this.name = "PostController";
    }
    post(request, response) {
        console.log("\n\nControl:\npost control!");
        response.send('{"key":"value"}');
    }
}

export { GetController, PostController };
