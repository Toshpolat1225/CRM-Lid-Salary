const number = document.querySelectorAll('.numbers')
number.forEach((elem, index) => {
  elem.innerHTML = index + 1
})
const toCurrency = (price) => {
  return Intl.NumberFormat("en-En", {
    currency: "usd",
    style: "currency",
  }).format(price);
};
document.querySelectorAll(".price").forEach((elem) => {
  elem.textContent = toCurrency(elem.textContent);
});

const csrf = document.querySelector("#csrf");

fetch("/admin/items/edit", {
  credentials: "same-origin",
  method: "POST",
  headers: {
    "X-XSRF-TOKEN": csrf.value,
  },
  body: {
    favoriteColor: "blue",
  },
});




