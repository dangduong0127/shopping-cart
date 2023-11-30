function Register(e) {
  let acc = [
    {
      email: "dangduong",
      phoneNumber: "09880908",
      password: "123123",
    },
    {
      email: "dangduong0999",
      phoneNumber: "09880908",
      password: "123123",
    },
    {
      email: "dangduong01",
      phoneNumber: "09880908",
      password: "123123",
    },
  ];
  event.preventDefault();
  const email = document.getElementById("email").value;
  const phone = document.getElementById("numberPhone").value;
  const pass = document.getElementById("password").value;
  const re_pass = document.getElementById("re_password").value;

  const user = {
    email: email,
    phoneNumber: phone,
    password: pass,
  };
  acc.push(user);
  const json = JSON.stringify(acc);
  localStorage.setItem("username", json);

  console.log("user added");
}
