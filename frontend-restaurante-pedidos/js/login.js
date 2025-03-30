document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".btn-iniciar");

  loginButton.addEventListener("click", async () => {
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3005/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Usuario o contraseña incorrectos");
        return;
      }

      // Verificar que el servidor devolvió datos válidos
      if (!data || !data.rol) {
        alert("Error: Respuesta inválida del servidor");
        return;
      }

      // Guardar usuario en sesión
      localStorage.setItem("currentUser", JSON.stringify(data));

      // Redirigir según el rol
      switch (data.rol) {
        case "cajero":
          window.location.href = "cajero.html";
          break;
        case "mesero":
          window.location.href = "mesero.html";
          break;
        case "chef":
          window.location.href = "chef.html";
          break;
        default:
          alert("Rol no reconocido");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  });
});
