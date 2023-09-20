import express, { request } from "express";

import { GetController, PostController } from "../controller/controller.mjs";

const router = express.Router();

const getController = new GetController();
const postController = new PostController();

function getRoute(request, response) {
    console.log("\n\nRoutes:\nGET API!!");
    getController.get(request, response);
}

function postRoute(request, response) {
    console.log("\n\nRoutes:\nPOST API!!");
    postController.post(request, response);
}

export { getRoute, postRoute };
