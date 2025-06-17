const request = require("supertest");

const BASE_URL = "http://localhost:5000";
const LOGIN_ENDPOINT = "/api/v1/auth/login";
const CART_UPDATE = "/api/v1/cart/update";
const CART_COMPLETE = "/api/v1/cart/complete";

const LEGIT = {
  email: "n21dccn003@student.ptithcm.edu.vn",
  password: "123456789",
};

let token;

const cartUpdateBody = {
    storeId: "67c6e409f1c07122e88619d6",
    dishId: "68157dd418a6b80afd2e90c0",
    quantity: 1,
    toppings: [
        "67dc1f22fa72c3f295e43434",
        "67e4bdc17d122ca7f70e9030",
        "67fe540c3cf6b4b8d427de47",
        "67cb03465ebf58c06f0f3146",
        "67cd62e709defde4ea8bc46a"
    ]
}


const cartCompleteBody = {
  storeId: "67c6e409f1c07122e88619d6",
  paymentMethod: "cash",
  deliveryAddress:
    "Đường A1, Phường Tân Thới Nhất, Quận 12, Thành phố Hồ Chí Minh, 71509, Việt Nam",
  customerName: "SYSTEM TESTER",
  customerPhonenumber: "0123456789",
  detailAddress: "",
  note: "",
  location: [106.6195634, 10.8248844],
};

beforeAll(async () => {
  const res = await request(BASE_URL).post(LOGIN_ENDPOINT).send(LEGIT);

  expect(res.statusCode).toBe(200);
  expect(res.body?.token).toBeDefined();

  token = res.body.token;
});

describe("Cart API - JWT Auth Test Suite", () => {
  // === /cart/update ===
  describe("POST /cart/update", () => {
    test("TC_A01: With valid JWT (should succeed)", async () => {
      const res = await request(BASE_URL)
        .post(CART_UPDATE)
        .set("Authorization", `Bearer ${token}`)
        .send(cartUpdateBody);

      expect([200, 201]).toContain(res.statusCode);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toMatch(/cart/i);
    });

    test("TC_A02: Without JWT (should fail)", async () => {
      const res = await request(BASE_URL).post(CART_UPDATE).send(cartUpdateBody);

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toMatch("There is no token attached to header");
    });

    test("TC_A03: With invalid JWT (should fail)", async () => {
      const res = await request(BASE_URL)
        .post(CART_UPDATE)
        .set("Authorization", `Bearer invalid.token.here`)
        .send(cartUpdateBody);

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toMatch("Not authorized token expired");
    });
  });

  // === /cart/complete ===
  describe("POST /cart/complete", () => {
    test("TC_A04: With valid JWT (should succeed)", async () => {
      const res = await request(BASE_URL)
        .post(CART_COMPLETE)
        .set("Authorization", `Bearer ${token}`)
        .send(cartCompleteBody);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toMatch(/Order placed successfully/i);
    });

    test("TC_A05: Without JWT (should fail)", async () => {
      const res = await request(BASE_URL)
        .post(CART_COMPLETE)
        .send(cartCompleteBody);

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toMatch("There is no token attached to header");
    });

    test("TC_A06: With invalid JWT (should fail)", async () => {
      const res = await request(BASE_URL)
        .post(CART_COMPLETE)
        .set("Authorization", `Bearer invalid.token.here`)
        .send(cartCompleteBody);

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toMatch("Not authorized token expired");
    });
  });
});
