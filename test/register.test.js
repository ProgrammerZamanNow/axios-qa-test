const axios = require('axios').default;
const {v4: uuid} = require('uuid');

test("Register Success", async () => {
    const registerRequest = {
        "company": {
            "name": "Example",
            "npwp": "1213123213",
            "siup": "213123123"
        },
        "email": `${uuid()}@example.com`,
        "password": "rahasia",
        "profile": {
            "birth": {
                "date": 1980
            },
            "phone": "0823123123",
            "gender": "MALE",
            "image": {},
            "interests": [
                "ECOMMERCE"
            ],
            "name": "Nama Admin"
        }
    }

    const registerResponse = await axios.post("http://localhost:8080/api/brand/users/_signup", registerRequest)
    const registerResponseData = registerResponse.data;

    expect(registerResponseData.code).toBe(200);
    expect(registerResponseData.status).toBe("OK");
})

test("Register Error Company Name", async () => {
    const registerRequest = {
        "company": {
            "name": "", // blank
            "npwp": "1213123213",
            "siup": "213123123"
        },
        "email": `${uuid()}@example.com`,
        "password": "rahasia",
        "profile": {
            "birth": {
                "date": 1980
            },
            "phone": "0823123123",
            "gender": "MALE",
            "image": {},
            "interests": [
                "ECOMMERCE"
            ],
            "name": "Nama Admin"
        }
    }

    const registerResponse = await axios.post("http://localhost:8080/api/brand/users/_signup", registerRequest, {
        validateStatus: () => true
    });
    const registerResponseData = registerResponse.data;
    console.info(registerResponseData);

    expect(registerResponseData.code).toBe(400);
    expect(registerResponseData.status).toBe("BAD_REQUEST");
    expect(registerResponseData.errors['company.name']).toContain("must not be blank");
})

test("Register Success And Login", async () => {
    const registerRequest = {
        "company": {
            "name": "Example",
            "npwp": "1213123213",
            "siup": "213123123"
        },
        "email": `${uuid()}@example.com`,
        "password": "rahasia",
        "profile": {
            "birth": {
                "date": 1980
            },
            "phone": "0823123123",
            "gender": "MALE",
            "image": {},
            "interests": [
                "ECOMMERCE"
            ],
            "name": "Nama Admin"
        }
    }

    const registerResponse = await axios.post("http://localhost:8080/api/brand/users/_signup", registerRequest)
    const registerResponseData = registerResponse.data;

    expect(registerResponseData.code).toBe(200);
    expect(registerResponseData.status).toBe("OK");

    const loginRequest = {
        "password": "rahasia",
        "username": registerRequest.email
    };
    const loginResponse = await axios.post("http://localhost:8080/api/user/_login", loginRequest)
    const loginResponseData = loginResponse.data;

    expect(loginResponseData.code).toBe(200);
    expect(loginResponseData.status).toBe("OK");
    expect(loginResponseData.data.token).not.toBeNull();
})
