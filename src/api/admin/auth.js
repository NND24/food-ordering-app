export const login = async (email, password) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/auth/login/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Đăng nhập thất bại!");
      }
  
      return data;g
    } catch (err) {
      throw err;
    }
  };
  