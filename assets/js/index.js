const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

$(function() {

    $("form").on("submit", function (e){
        e.preventDefault()
    })

    // Download as PNG
    $("#download-banner").show().on('click', async function downloadIcon() {
        const data = await html2canvas(document.querySelector("#banner"));
        document.querySelector("#preview").src = data.toDataURL()
        data.toBlob(function(blob) {
            const filename = $(".banner-title").text()
            saveAs(blob, filename + ".png");
            const item = new ClipboardItem({ "image/png": blob })
            navigator.clipboard.write([item])
        })
    })
    
    // Prepare icons
    var tick = './assets/dist/images/tick.png'
    var susceptibilityIcons = {
        familiar: './assets/dist/images/familiar.png',
        sgb: './assets/dist/images/sgb.png',
        poison: './assets/dist/images/poison.png',
        undeadSlayer: './assets/dist/images/undead-slayer.png',
        dragonSlayer: './assets/dist/images/dragon-slayer.png',
        demonSlayer: './assets/dist/images/demon-slayer.png',
        hexhunter: './assets/dist/images/hexhunter.png',
        inquisitor: './assets/dist/images/inquisitor.png',
        omniguard: './assets/dist/images/omniguard.png',
        terrasaur: './assets/dist/images/terrasaur.png'
    }

    // Live update title
    $("#bannerTitle").on('input', function() {
        val = this.value
        $(".banner-title").text(val)
    })


    // Live update boss size1
    $("#bossSize1").on('input', function() {
        size = this.value
        $(".boss-size1").text(size)
    })
    // Live update boss size2
    $("#bossSize2").on('input', function() {
        var size = this.value
        var el = $(".boss-size2").text(size)

        if (size == "hide") {
            el.hide()
        } else {
            el.show()
        }
    })


    function renderSusceptibilities() {
        var selected = $(".susceptibility-option:checked").map(function() {
            return this.value
        }).get()

        $(".banner-row-top .susceptibility-top").remove()
        $(".banner-row-bottom .susceptibility-bottom").remove()
        $(".banner-rows").toggleClass("susceptibility-compact", selected.length >= 6)

        selected.forEach(function(value) {
            var icon = susceptibilityIcons[value]

            if (!icon) {
                return
            }

            $(".banner-row-top").append(
                '<div class="col susceptibility-top susceptibility-' + value + '-top"><img src="' + icon + '"></div>'
            )
            $(".banner-row-bottom").append(
                '<div class="col susceptibility-bottom susceptibility-' + value + '-bottom"><img src="' + tick + '"></div>'
            )
        })
    }

    $(".susceptibility-option").on('change', renderSusceptibilities)
    renderSusceptibilities()

})

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

    elmnt.addEventListener("wheel", (e) => {
        e.preventDefault()
        var currentSize = $(elmnt).width()
        if (e.deltaY > 0) {
            $(elmnt).width(currentSize + 10)
        } else {
            $(elmnt).width(currentSize - 10)
        }
    })

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


// Add images from file
function bannerUpload(itemName, blur, draggable) {
    var elementId = "banner-" + itemName
    var filesSelected = document.getElementById(elementId + "-uploader").files
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0]

        var fileReader = new FileReader()

        var newImage = document.createElement('img')

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result

            newImage.src = srcData
            var bannerItem = document.getElementById("banner-" + itemName)

            if (blur) {
                bannerItem.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 3'><filter id='b' color-interpolation-filters='sRGB'><feGaussianBlur stdDeviation='0.04' /></filter><image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' href='" + srcData + "' /></svg>"
            } else {
                bannerItem.append(newImage)
                bannerItem.innerHTML = newImage.outerHTML
            }
        }
        fileReader.readAsDataURL(fileToLoad)

        dragElement(document.getElementById(elementId))
    }
}
