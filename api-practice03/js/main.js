const countryContainer = document.getElementById("country-container");
const baseURL = "https://restcountries.com/v2/";
let type = "region";
let searchText = "europe";

const loadData = async (isShowNext) => {
  const URL = `${baseURL}${type}/${searchText}`;
  const res = await fetch(URL);
  const data = await res.json();
  // console.log(data);

  if (isShowNext) {
    document.getElementById("btn-showNext").classList.add("hidden");

    country = displayAllData(data.slice(12, data.length));
    return country;
  }
  country = displayAllData(data.slice(0, 12));
};

const displayAllData = (data) => {
  countryContainer.innerHTML = "";
  data.forEach((data) => {
    const { cca2, name, population, flags, alpha2Code } = data;
    // console.log(data);
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("card", "w-full", "bg-base-100", "shadow-2xl");
    countryDiv.innerHTML = `
          <figure>
          <img class="w-[100%] h-[200px]" src="${
            flags
              ? flags.png
              : "https://i.ytimg.com/vi/ASeHQ-nVzvY/maxresdefault.jpg"
          }" alt="" />
          </figure>
          <div class="card-body text-center">
          <h2 class="card-title justify-center font-bold  text-2xl">${name}</h2>
          <p class="card-title justify-center  font-bold text-xl">Population : ${population} </p>
          <div class="card-actions justify-center">
          <label for="my-modal-6" onclick="showData('${
            alpha2Code ? alpha2Code : cca2
          }')" class="btn btn-secondary">More Details</label>
          </div>
          </div>
    `;
    countryContainer.appendChild(countryDiv);
  });
  spinner(false);
};

const showData = async (code) => {
  const URL = `https://restcountries.com/v2/alpha/${code}`;
  const res = await fetch(URL);
  const data = await res.json();
  // console.log(data);
  const { flags, region, area, nativeName, numericCode, independent } = data;
  modalBox.innerHTML = `
        <div class="modal-box">
          
          <figure>
              <img src="${
                flags
                  ? flags.png
                  : "https://i.ytimg.com/vi/ASeHQ-nVzvY/maxresdefault.jpg"
              }" class="shadow-lg w-[100%] h-[230px]" alt="" />
          </figure>
      
          <h3  class="font-bold text-lg pt-4">Region : ${region}</h3>
          <h3  class="font-bold text-lg pt-1">Numeric Code : ${numericCode}</h3>
          <h3  class="font-bold text-lg pt-1">Area : ${area}</h3>
          <h3  class="font-bold text-lg pt-1">Native Name : ${nativeName}</h3>
          <h3  class="font-bold text-lg pt-1">Independent : ${independent}</h3>
         

          <div class="modal-action">
              <label for="my-modal-6" class="btn btn-primary">Close</label>
          </div>
        </div> 
  `;
};
// spinner
const spinner = (isSpin) => {
  if (isSpin) {
    document.getElementById("spinner").classList.add("flex");
    document.getElementById("spinner").classList.remove("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("spinner").classList.remove("flex");
  }
};
const getTextByFunction = (types, searchTextElement) => {
  spinner(true);
  document.getElementById("btn-showNext").classList.remove("hidden");
  type = types;
  searchText = searchTextElement;

};
document.getElementById("regionBtn").addEventListener("click", function () {
  getTextByFunction("region", "asia");
  spinner(true);
  loadData();
});
document.getElementById("capitaBtn").addEventListener("click", function () {
  getTextByFunction("capital", "Luanda");
  spinner(true);
  loadData();
});
document.getElementById("languageBtn").addEventListener("click", function () {
  getTextByFunction("lang", "ar");
  spinner(true);
  loadData();
});

function val() {
  searchText = document.getElementById("select_id").value;
  loadData();
}

loadData();
