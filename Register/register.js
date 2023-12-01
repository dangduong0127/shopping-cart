function Register() {
  event.preventDefault();
  let acc = JSON.parse(localStorage.getItem("username")) || [];
  const email = document.getElementById("email").value;
  const phone = document.getElementById("numberPhone").value;
  const pass = document.getElementById("password").value;
  const re_pass = document.getElementById("re_password").value;

  if (email === "") {
    alert("Chua nhap email");
  } else if (phone === "") {
    alert("Chua nhap so dien thoai");
  } else if (pass === "") {
    alert("Chua nhap mat khau");
  } else if (re_pass === "") {
    alert("Chua nhap lai mat khau");
  } else {
    if (acc.length === 0) {
      if (pass === re_pass) {
        acc.push({
          email: email,
          phoneNumber: phone,
          password: pass,
        });
        localStorage.setItem("username", JSON.stringify(acc));
      } else {
        alert("mat khau khong khop!!!");
      }
    } else {
      for (let i in acc) {
        if (acc[i].email === email) {
          alert("tai khoan da ton tai!!!");
          return;
        } else if (pass !== re_pass) {
          alert("mat khau khong khop!!!");
          return;
        } else {
          acc.push({
            email: email,
            phoneNumber: phone,
            password: pass,
          });
          localStorage.setItem("username", JSON.stringify(acc));
        }
      }
    }
  }

  console.log("user added");
}
