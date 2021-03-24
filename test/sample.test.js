const axios = require('axios').default;

test("Test Example Domain", async () => {
    const response = await axios.post("https://example.com/");
    const body = response.data;

    expect(body).toContain("Example Domain");
})
