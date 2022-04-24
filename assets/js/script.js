const url = (word) =>
  `https://viko-api.herokuapp.com/api/info/kbbi?kata=${word}&apikey=rxking`;
const template_card = (word) => `

          <div class="col-md-6 mb-3">
            <div class="card" style="max-width: auto">
              <div class="card-body">
                <p class="card-text">
                  ${word}
                </p>
              </div>
            </div>
          </div>
`;

const content_word = document.querySelector(".content_word");

const get_data = async (input) => {
  try {
    const response = await axios.get(url(input));

    const data = response.data.result;

    //alert(JSON.stringify(data));
    let stored_html = "";
    stored_html += `          <div class="col">
            <h3 class="text-center text-primary">Kosakata : ${data.lema}</h3>
          </div>
`;
    data.arti.forEach((v) => {
      stored_html += template_card(v);
    });
    content_word.innerHTML = stored_html;
  } catch (e) {
    /* handle error */
    alert(e);
  }
};

const info_btn = document.querySelector(".info_btn");
const search_btn = document.querySelector(".search_btn");
const search_input = document.querySelector(".search_inp");

info_btn.addEventListener("click", function () {
  Swal.fire(
    "Hello there!",
    "Website ini hanya bertujuan untuk edukasi, jika website ini melanggar peraturan silahkan hubungi admin untuk menghapus website ini!",
    "info"
  );
});

search_btn.addEventListener("click", function () {
  content_word.innerHTML = `
          <div class="col-md-6 mb-3">
            <div class="card" style="max-width: auto">
              <div class="card-body">
<button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>
              </div>
            </div>
          </div>`;
  //alert(search_input.value);
  get_data(search_input.value);
});
