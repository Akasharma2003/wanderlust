

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();



const filters = document.querySelector(".filters");
const arrowIcons = document.querySelectorAll(".icon i");

const handleIcons = () =>{
  let scrollVall = Math.round(filters.scrollLeft);
  let maxScrollableWidth = filters.scrollWidth - filters.clientWidth;
  arrowIcons[0].parentElement.style.visibility = scrollVall > 0 ? "visible" : "hidden";
   arrowIcons[1].parentElement.style.visibility = maxScrollableWidth > scrollVall ?"visible":"hidden";
}

arrowIcons.forEach(icon=>{
    icon.addEventListener("click",()=>{
      // if clicked icon is left reduce 350 from filters scrollleft else add 350........
      filters.scrollLeft += icon.id ==="left" ? -350 : 350;
            handleIcons();
            setTimeout(()=> handleIcons(),50); //calling handle icon after 50 milisecond
    });
})

let isDragging = false;
const dragging = (e)=>{
   if(!isDragging) return ;
  filters.scrollLeft -= e.movementX;
  filters.classList.add("dragging");
  handleIcons();
};

const dragStop = ()=>{
  isDragging = true;
  filters.classList.remove("dragging");
}

// filters.addEventListener("mousedown",()=>isDragging=true);
// filters.addEventListener("mousemove",dragging);
// document.addEventListener("mouseup",dragStop);



// TAX SWITCH WITH 18 PERCENT GST
let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (info of taxInfo) {
      if (info.style.display != "inline") {
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    }
  });
  
