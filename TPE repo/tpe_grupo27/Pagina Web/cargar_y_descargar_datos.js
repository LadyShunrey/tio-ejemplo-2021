document.addEventListener("DOMContentLoaded", function(event) {
    const url = "https://raw.githubusercontent.com/exajoakinic/tpe_grupo_27/master/Pagina%20Web/";
    const json_error = [{ "titulo": "error", "titulo_original": "error", "generos": ["error"], "sinopsis": "error", "duracion": "error", "director": "error", "actores": ["error"], "pais_de_origen": "error", "fecha_de_salida": "error" }]

    /* create top tier */
    let toptier = document.querySelector("#top_tier")
    for (let i = 10; i > 0; i--) {
        let div = document.createElement("div")
        div.innerHTML = `${i}`;
        div.addEventListener("click", function(e) {
            cargar_datos(i, //top position
                `jsons/top${('0' + i).slice(-2)}.json`, //top json information
                `Multimedia/portadatop${('0' + i).slice(-2)}.jpg` /*top jpg cover*/ 
            )
        });
        toptier.appendChild(div);
    }

    selectors = document.querySelector("#top_tier").querySelectorAll("div");

    selectors.forEach(element => {
        element.addEventListener("click", function(e) {
            selectors.forEach(element => {
                element.style.borderColor = "";
            });
            element.style.borderColor = "black";
        })
    });

    function cargar_datos(topnum, topurldata, topurlcover) {

        fetch(url + topurldata)
            .then(response => response.json())
            .then(datatop => {
                crear_peli(datatop, url + topurlcover, topnum);
            })
            .catch(error => crear_peli(json_error, url + topurlcover, topnum))

    }
    let content = document.querySelector("#content")
    content.innerHTML = "";

    function crear_peli(json, image, topnum) {
        content.innerHTML = "";
        location.href = "#top_tier";
        //Portada
        let img = document.createElement("img");
        img.src = image;
        img.alt = `portada top ${topnum}: ${json[0].titulo}`;
        content.appendChild(img);
        //Titulo
        let h2 = document.createElement("h2");
        h2.innerHTML = json[0].titulo;
        content.appendChild(h2);
        //Titulo original
        let h3 = document.createElement("h3");
        h3.innerHTML = `Titulo original: ${json[0].titulo_original}`;
        content.appendChild(h3);
        //Director
        let p = document.createElement("p");
        p.innerHTML = `Director: ${json[0].director}`;
        content.appendChild(p);
        //Sinopsis
        p = document.createElement("p");
        p.innerHTML = `Sinopsis: ${json[0].sinopsis}`;
        content.appendChild(p);
        //Duracion
        p = document.createElement("p");
        p.innerHTML = `Duracion: ${json[0].duracion}`;
        content.appendChild(p);
        //Generos
        p = document.createElement("p")
        p.innerHTML = "Generos:"
        for (let i = 0; i < (json[0].generos).length; i++) {
            let span = document.createElement("span");
            span.innerHTML = json[0].generos[i];
            p.appendChild(span);
        }
        content.appendChild(p);
        //Actores
        p = document.createElement("p")
        p.innerHTML = "Actores:"
        for (let i = 0; i < (json[0].actores).length; i++) {
            let span = document.createElement("span");
            span.innerHTML = json[0].actores[i];
            p.appendChild(span);
        }
        content.appendChild(p);
        //Duracion
        p = document.createElement("p");
        p.innerHTML = `Origen: ${json[0].pais_de_origen}`;
        content.appendChild(p);
        //Duracion
        p = document.createElement("p");
        p.innerHTML = `Fecha de salida: ${json[0].fecha_de_salida}`;
        content.appendChild(p);
    }
});