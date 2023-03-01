const countryContainer = document.getElementById("country-container");
const nextBtn = document.getElementById("btn-showNext");
const spinner = document.getElementById("spinner");
const langSelectElement = document.getElementById("lang-option");
const regionSelectElement = document.getElementById("select_id");

const baseURL = "https://restcountries.com/v2";
let apiType = "region";
let searchText = "asia";
let limit = 12;

const getApiURL = () => `${baseURL}/${apiType}/${searchText}`;

const loadData = async (isShowNext) => {
  try {
    const URL = getApiURL();
    const res = await fetch(URL);
    let data = await res.json();
    data = isShowNext ? data.slice(limit, data.length) : data.slice(0, limit);
    // if 'isShowNext' is true, add "hidden" class, if false remove it.
    nextBtn.classList.toggle("hidden", !!isShowNext);
    displayAllData(data);
  } catch (error) {
    if (error) countryContainer.innerHTML = "<h1>No country found!</h1>";
  }
};

const displayAllData = (data) => {
  countryContainer.innerHTML = "";
  data.forEach(({ cca2, name, population, flags, alpha2Code }) => {
    countryContainer.innerHTML += `
    <div class="card w-full bg-base-100 shadow-2xl">
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
    </div>
    `;
  });

  showSpinner(false);
};

// Modal
const showData = async (code) => {
  const URL = `${baseURL}/alpha/${code}`;
  const res = await fetch(URL);
  const { flags, region, area, nativeName, numericCode, independent } =
    await res.json();

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
const showSpinner = (isSpin) => {
  // if 'isSpin' is true, add class, if false remove it.
  // '!!' convert truthy value to true, falsy value to false
  spinner.classList.toggle("flex", !!isSpin);
  spinner.classList.toggle("hidden", !isSpin);
  if (isSpin) countryContainer.innerHTML = "";
};

// Lang api fetch from file
const fecthLangApi = async () => {
  const res = await fetch("../langApi.json");
  const data = await res.json();
  loadLangOptions(data);
};

const loadLangOptions = (data) => {
  data.forEach(({ code }) => {
    langSelectElement.innerHTML += `<option value='${code}'>${code}</option>`;
  });
};

regionSelectElement.addEventListener("change", ({ target }) => {
  showSpinner(true);
  searchText = target.value;
  loadData();
});

langSelectElement.addEventListener("change", ({ target }) => {
  showSpinner(true);
  apiType = "lang";
  searchText = target.value;
  loadData();
});

showSpinner(true);
fecthLangApi();
loadData();
