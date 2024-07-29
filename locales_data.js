
const BERNAL_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9OPPzWnQ9MY2rEOfagp_z6EtjG9wUMzcmsYrjHxwvkNjqledSICKveN1JcnsV5ZLO48oyXduTMWZ4/pub?gid=0&single=true&output=csv"
const RIVERA_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9OPPzWnQ9MY2rEOfagp_z6EtjG9wUMzcmsYrjHxwvkNjqledSICKveN1JcnsV5ZLO48oyXduTMWZ4/pub?gid=104921192&single=true&output=csv"




async function colaboradoress() {
    const csvData = await fetch(BERNAL_SHEET)
        .then((res) => res.text())
        .then((csv) =>
            csv.split("\n")
                .slice(1)
                .map((row) => {
                    const [legajo, nombre] = row.split(",");
                    return { legajo, nombre };
                })
        );

    console.log(csvData.length)
    return csvData;
}

const colaboradores =  colaboradoress();


    





