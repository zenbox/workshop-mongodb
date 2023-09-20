export default class Api {
    /* Write a mongodb class, that handle alle CRUD operations.*/
    constructor() {
        this.url = "http://localhost:3000";
    }
    async get() {
        const response = await fetch(`${this.url}/api`);
        const data = await response.json();
        return data;
    }
    async post(data) {
        const response = await fetch(`${this.url}/api`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        return res;
    }
    async put(data) {
        const response = await fetch(`${this.url}/api`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        return res;
    }
    async delete(data) {
        const response = await fetch(`${this.url}/api`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        return res;
    }
}
