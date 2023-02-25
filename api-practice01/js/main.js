const personData = document.getElementById("personData");

const loaddata = (isNext) => {
  fetch("../json/data.json")
    .then((res) => res.json())
    .then((data) => {
      if (isNext) {
        return displayData(data.result.slice(4, data.length));
      }
      displayData(data.result.slice(0, 4));
    });
};
const displayData = (data) => {
  personData.innerHTML = "";
  data.forEach((data) => {
    console.log(data.name.common);
    const div = document.createElement("div");
    div.classList.add("border-2", "border-slate-400", "shadow-2xl");
    div.innerHTML = `
    <h2
      class="text-3xl py-2 px-2 border-slate-400 border-2 border-l-0 border-r-0 border-t-0"
    >
      Person Name : ${data.name.common}
    </h2>
    <p class="px-2 py-4">Age : ${data.age}</p>
    <p class="px-2 pb-4">Street : ${data.address.street} ${data.address.house}</p>
  
    `;
    personData.appendChild(div);
  });
};

loaddata();
