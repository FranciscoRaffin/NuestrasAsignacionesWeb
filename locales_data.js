const BERNAL_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9OPPzWnQ9MY2rEOfagp_z6EtjG9wUMzcmsYrjHxwvkNjqledSICKveN1JcnsV5ZLO48oyXduTMWZ4/pub?gid=0&single=true&output=csv";
const RIVERA_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9OPPzWnQ9MY2rEOfagp_z6EtjG9wUMzcmsYrjHxwvkNjqledSICKveN1JcnsV5ZLO48oyXduTMWZ4/pub?gid=104921192&single=true&output=csv";
const ONCE_SHEET   = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQKZrBrDW6F0b6DvwrQFtOe5APL4s_lj1UjhsxGA3-3dM2zeT8XZjJt0gk0XeIz9LirnCF71oikYIxc/pub?output=csv" 
const MUESTRA_SHEET= "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9OPPzWnQ9MY2rEOfagp_z6EtjG9wUMzcmsYrjHxwvkNjqledSICKveN1JcnsV5ZLO48oyXduTMWZ4/pub?gid=816645039&single=true&output=csv"


// .html?local-key=RIVERA

let redirect = {
  "BERNAL": BERNAL_SHEET,
  "RIVERA": RIVERA_SHEET,
  "ONCE"  : ONCE_SHEET,
  "MUESTRA": MUESTRA_SHEET
};



const key = getParameterByName('local-key') ?? "MUESTRA";
const local = redirect[String(key)];
const colaboradores = colaboradoresFetch();



function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

async function colaboradoresFetch() {
    const csvData = await fetch(local)
      .then((res) => res.text())
      .then((csv) =>
        csv.split("\n")
          .slice(1)
          .map((row) => {
            const [legajo, nombre] = row.split(",");
            return { legajo, nombre };
          })
      );
  
    return csvData;
  }
  