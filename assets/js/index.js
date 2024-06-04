const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

$(function() {

    // Download as PNG
    async function downloadBanner() {
        const data = await html2canvas(document.querySelector("#banner"));
        document.querySelector("#preview").src = data.toDataURL()
        data.toBlob(function(blob) {
            const item = new ClipboardItem({ "image/png": blob })
            navigator.clipboard.write([item])
        })
    }
    $("#download-banner").show().on('click', downloadBanner)

    // Prepare icons
    var tick = 'data:image/png;base64,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'
    var cross = 'data:image/png;base64,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'
    var omniguard = 'data:image/png;base64,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'
    var hexhunter = 'data:image/png;base64,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'
    var terrasaur = 'data:image/png;base64,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'
    var inquisitor = 'data:image/png;base64,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'

    // Live update title
    $("#bannerTitle").on('input', function() {
        val = this.value
        $(".banner-title").text(val)
    })

    // Live update boss size
    $("#bossSize").on('input', function() {
        size = this.value
        $(".boss-size-bottom").find("span").text(size)
        img = $(".sgb-bottom img")
        if (size == "1x1" || size == "2x2") {
            img.attr("src", cross)
        } else {
            img.attr("src", tick)
        }
    })


    // Live update poisonable
    $("#poisonable").on('change', function() {
        img = $(".poisonable-bottom img")
        if ($(this).is(':checked')) {
            img.attr("src", tick)
        } else {
            img.attr("src", cross)
        }
    })


    // Live update weakness
    $("#weakness").on('change', function() {
        img = $(".weakness-top img")
        var icon = inquisitor

        console.log(this.value)
        switch (this.value) {
            case 'omniguard':
                icon = omniguard
                break;
            case 'hexhunter':
                icon = hexhunter
                break;
            case 'terrasaur':
                icon = terrasaur
                break;
            case 'inquisitor':
                icon = inquisitor
                break;
            default:
                icon = none
        }

        img.attr("src", icon)
    })

    // Live update weakness switch
    $("#weakness-toggle").on('change', function() {
        img = $(".weakness-bottom img")
        if ($(this).is(':checked')) {
            img.attr("src", tick)
        } else {
            img.attr("src", cross)
        }
    })


    // Live update familiar
    $("#familiar").on('change', function() {
        img = $(".familiar-bottom img")
        if ($(this).is(':checked')) {
            img.attr("src", tick)
        } else {
            img.attr("src", cross)
        }
    })

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