(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  const loaders = document.querySelectorAll(".loader");
  const annotations = document.querySelectorAll(".HotspotAnnotation");
  const loaderMaterial = document.querySelector("#loader-material");

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  function loadInfoBoxes() {
   
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes);

      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index + 1}`);
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;
  
        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;

        const infoImg = document.createElement('img');
        infoImg.src = `images/${infoBox.thumbnail}`;
  
        selected.appendChild(infoImg);
        selected.appendChild(titleElement);
        selected.appendChild(textElement);

      });

    })
    .catch(error => {
      console.log(error);

      loaders.forEach(loader => {
        loader.classList.toggle("hidden");
        annotations.innerHTMl = "";
      });

      annotations.forEach(annotation => {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Oops, it's looks like something went wrong. please check your internet connection or try again later.";
        errorMessage.style.color = "#acacac";
        errorMessage.style.fontSize = "13px";

        annotation.appendChild(errorMessage);
      })

    })
  }

  loadInfoBoxes()

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"

  function loadMaterialInfo() {

    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(materials => {
      console.log(materials);

      materials.forEach(material => {
        //clone the template, make a copy of that template//
        const clone = materialTemplate.content.cloneNode(true);
        //populate with data//
        const materialHeading = clone.querySelector(".material-heading"); 
        materialHeading.textContent = material.heading;
    
        const materalDescription = clone.querySelector(".material-description");
        materalDescription.textContent = material.description;
    
        materialList.appendChild(clone);
        });



    })
    .catch(error => {
      console.log(error)

      loaderMaterial.classList.toggle("hidden");
      materialList.innerHTML = "";

      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Oops, it's looks like something went wrong. please check your internet connection or try again later.";
      errorMessage.style.color = "#acacac";

      materialList.appendChild(errorMessage)
    })

    }

    loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

