const form = document.getElementById("form");
const list = document.getElementById("list");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    email: email.value,
    date: date.value,
    time: time.value
  };

  const res = await fetch("http://localhost:3000/book", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message);
  loadAppointments();
});

async function loadAppointments(){
  const res = await fetch("http://localhost:3000/appointments");
  const data = await res.json();

  list.innerHTML="";
  data.forEach(a=>{
    list.innerHTML += `
      <tr>
        <td>${a.name}</td>
        <td>${a.email}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>${a.status}</td>
      </tr>
    `;
  });
}

loadAppointments();
