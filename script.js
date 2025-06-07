document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    date: document.getElementById("date").value,
    note: document.getElementById("note").value
  };

  fetch("https://script.google.com/macros/s/AKfycbwhqXUdMDlOQODay1dH5iobLX1yF2L98Xz4UJrwxTeOmewoTQYmQ_BkUkdgqmP5BWvr/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Server error: " + response.status);
      return response.text();
    })
    .then((text) => {
      document.getElementById("statusMsg").textContent = "✅ Appointment saved!";
      document.getElementById("bookingForm").reset();
    })
    .catch((error) => {
      document.getElementById("statusMsg").textContent = `❌ Something went wrong: ${error.message}`;
      console.error(error);
    });
});
