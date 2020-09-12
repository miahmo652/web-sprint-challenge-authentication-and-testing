const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");



describe("User Authentication", () => {
    it("Get user", async () => {
        const res = await supertest(server).get("/api/auth/users");
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(4);
        expect(res.body[0].username).toBe("jane");
    });

    it("tests register endpoint", async () => {
        const reg = await supertest(server).post("/api/auth/register").send({
            username: "jane",
            password: "password"
        });
        expect(reg.statusCode).toBe(409);
        expect(reg.type).toBe("application/json");
    });

    it("tests failed login endpoint", async () => {
        const login = await supertest(server).post("/api/auth/login").send({
            username: "janqwe",
            password: "passwowdard"
        });
        expect(login.statusCode).toBe(401);
        expect(login.type).toBe("application/json");
        expect(login.body.message).toBe("You shall not pass!");
      
    });

    it("tests login endpoint", async ()=>{
        const login = await supertest(server).post("/api/auth/login").send({
            username:"jane",
            password:"password"
        });
        expect(login.statusCode).toBe(200);
        expect(login.type).toBe("application/json");
        expect(login.body.message).toBe("Welcome jane!")
    })

    it("GET jokes", () => {
        return supertest(server)
            .get("/api/jokes")
            .then(res => {
                expect(res.type).toMatch(/json/i);
            });
    });
});