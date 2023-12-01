function Login() {
  event.preventDefault();
  let username = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let noti = document.getElementById("notifi");
  let user = localStorage.getItem("username");
  let data = JSON.parse(user);
  let users = null;
  for (let i = 0; i < data.length; i++) {
    const currentUser = data[i];
    if (username == currentUser.email && pass == currentUser.password) {
      users = currentUser;
      break;
    }
  }

  if (users) {
    localStorage.setItem("loggedInUser", username);
    window.location = "../index.html";
  } else {
    alert("Sai tk hoac mat khau!!");
  }
  checkIfLoggedIn();
}

// Kiểm tra nếu đã đăng nhập trước đó
function checkIfLoggedIn() {
  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    // Nếu có thông tin người dùng, hiển thị trang đã đăng nhập
    window.location = "../Account/acc.html";
  }
}

checkIfLoggedIn();
