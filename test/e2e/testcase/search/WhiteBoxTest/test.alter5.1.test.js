const request = require("supertest");
const BASE_URL = "http://localhost:5000"; // ✅ đúng port server đang chạy

describe("GET /api/v1/customerStore", () => {
  it("TC1: Tìm kiếm theo tên + vị trí + phân trang", async () => {
    const res = await request(BASE_URL)
      .get("/api/v1/customerStore/") 
      .query({
        name: "Tasty",
        category: "",
        sort: "",
        limit: 20,
        page: 1,
        lat: 10.762622,
        lon: 106.660172,
      });

    console.log(res.body); // 👈 thêm để debug khi lỗi

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeLessThanOrEqual(20);
  });
  it("TC2: Không có name, chỉ lọc theo khoảng cách", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      category: "",
      sort: "",
      limit: 20,
      page: 1,
      lat: 10.762622,
      lon: 106.660172,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("TC3: Không có lat/lon, chỉ lọc theo tên", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      name: "Tasty",
      category: "",
      sort: "",
      limit: 20,
      page: 1,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
  it("TC4: Tên không tồn tại (kết quả rỗng)", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      name: "TênKhôngTồnTại",
      lat: 10.762622,
      lon: 106.660172,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(0);
  });

  it("TC5: Sai định dạng lat/lon", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      name: "Tasty",
      lat: "abc",
      lon: "xyz",
    });

    expect(res.statusCode).toBe(200); // hoặc 400 nếu có validate
    expect(res.body.success).toBe(true); // hoặc false nếu lỗi
  });

  it("TC6: Lọc theo category cụ thể", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      category: "67c9128a8bdfd68d9d04b8fc",
      lat: 10.762622,
      lon: 106.660172,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
  it("TC7: Sắp xếp theo rating", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      sort: "rating",
      lat: 10.762622,
      lon: 106.660172,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("TC8: Sắp xếp theo nổi bật", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      sort: "standout",
      lat: 10.762622,
      lon: 106.660172,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
  it("TC9: Sắp xếp theo tên", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      sort: "name",
      lat: 10.762622,
      lon: 106.660172,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
  it("TC10: Store thiếu tọa độ lat/lon", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      name: "StoreKhôngTọaĐộ", // giả lập store bị thiếu lat/lon (nên mock DB hoặc thêm data test tương ứng)
      limit: 20,
      page: 1,
      lat: 10.762622,
      lon: 106.660172,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    // Store không có tọa độ sẽ bị loại do distance=Infinity => 0 kết quả
    expect(res.body.data.length).toBe(0);
  });

  // ✅ TC11: Không truyền limit và page → kiểm tra không phân trang
  it("TC11: Không có phân trang (limit, page)", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      name: "Tasty",
      lat: 10.762622,
      lon: 106.660172,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body).not.toHaveProperty("currentPage");
    expect(res.body).not.toHaveProperty("pageSize");
  });

  // ✅ TC12: Không có store nào được APPROVED
  it("TC12: Không có store nào hợp lệ (status khác APPROVED)", async () => {
    const res = await request(BASE_URL).get("/api/v1/customerStore/").query({
      name: "UnapprovedStoreTest", // cần có store test trong DB không phải APPROVED
      lat: 10.762622,
      lon: 106.660172,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(0);
  });
});
