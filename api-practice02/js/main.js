const carDataContainer = document.getElementById("carDataContainer");

const loadData = async () => {
  const URL = "../json/data.json";
  const res = await fetch(URL);
  const data = await res.json();
  displayData(data);
  /*   .then((res) => res.json())
  .then((data) => console.log(data)); */
};
const displayData = (data) => {
  // console.log(data);

  data.forEach((data) => {
    const { name, price, description, imageURL } = data;
    const div = document.createElement("div");
    div.classList.add("card", "w-96", "bg-base-100", "shadow-2xl");
    div.innerHTML = `
    <figure>
    <img class="w-auto h-[250px]" src="${
      imageURL
        ? imageURL
        : "https://th.bing.com/th/id/OIP.IPB6coeSYe__G_6c_5Nl9AHaEe?pid=ImgDet&rs=1"
    }" alt="" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Name : ${name}</h2>
    <p>Card Details : ${description.slice(0, 100) + "...."}</p>
    <div class="card-actions justify-start">
      <button class="btn btn-primary">Car Price : ${price}</button>
    </div>
  </div>
    `;
    carDataContainer.appendChild(div);
  });
};
loadData();
