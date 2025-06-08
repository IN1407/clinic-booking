document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    date: document.getElementById("date").value
  };

  fetch("http://localhost:5000/send-email", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(response => {
    if (!response.ok) throw new Error("Server error: " + response.status);
    return response.text();
  })
  .then(text => {
    document.getElementById("statusMsg").textContent = "✅ Appointment sent!";
    document.getElementById("bookingForm").reset();
  })
  .catch(error => {
    document.getElementById("statusMsg").textContent = `❌ Failed: ${error.message}`;
    console.error(error);
  });
});
