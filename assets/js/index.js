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

    var undeadSlayer = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADk0lEQVRYR82XS6hXZRTFf6ukdKBSJiJhD2tQCWmaFJrUwFERUUSRlI9SNChFG6WBDdSB+ChSKkwJo5KiF1kQRElF0cBHCjrxAaKIUVZiRVbuWLLP5XT6n3u959xLbvgP/t/5zvetvfbajyPOE9N5goM+AxIRA4GRwCPApXD27CPAVuCopJPdOd0nQCLiTuCjbi4K4D3gQUl/ddrXCkhEDAE+AW5JBnqK9I/A3ZK+qW5sDCQiRgBfA6N7ur3y/HdgpqS3yuuNgETEUMBeXd9LEMX2X4Hpkt4tFpoCWQMsbAiieG2vpDFtgXwJ3NYSiAU8QNIZn9OUkb0twlLGP0qSU/x/BzJGkp1qDGQfcB1genvLavmdsZJ2twHSJjQGYl1cCNwkaVcbIC5iVvzlGfC/gT8Bl/lO5su9x5ebwVeA+4ERkk63ATIMeAJYCswFNqWXDwMvA4MSjQG8BDwD/AyMz1LvCnuHJK+dtd7Gt8vbiPgMuELStWUKIuI5YEGubZd0c4fn84GrJB1uBSQi7gPeAfZIurFy0Qrg6VzbKckslB14ClhlZiT5nOaMRIRb+12AS/VQSY4/EXFPUm9PvwUeAN4AHpX0R+7Z4i4MnJDkELcC8iIwL89w+1+ZXbgQ6xRJX0XEfuCaFPJDzhJgcUpih6QJbYFYjAdyEKpmySZJj6X3twPbqhvy/5OS1rUCkpdcDTwPTAYuKQnfHdVTmtN5eqZqGct3yeCbkpxVzUNTvBwRl2UX3pgMdT2qZKQv9BQ3ADhYlPUyusbpm6y4PriWTAReBcbWhMHD0PCcYU9KurK6ryOQiDByDz3HJX1fc7izZHOG4RDgNHbFvRW4IN8xE3uAOcCizBavXSzJoeuyOiDTgNeBtZJ8QEeLCFdVV07bsmTH8+tM4CLgbUkfR8QNgJubS/wRSaPOlRHnufP9BUmugnVALNJj9jA3bE8t/JCd2ek8A3C6FzZDkpn8l9Ux4p7xmuMuaVYdkNTJFOCL0h5/LvyW/w2wAOmlz4GpxVTWMTQRsRq4N18cDPhnkRXe/QKMqx4SEXbmcWB9d4ABzzATJbka/8e6GImIDcDs3NFp4PGX2rBOH0gRYXEuAZ6tCLU434KdJOlUHdgyEAupYMHhcFw/zJL8k6SjPXjsLPJosDwF/AHwKeACN6uaJb3VyPuSHK5+tzqxFlmzRZKbVb9bHRDXADeubZIssn63ViW+L9H9A2KUNTJMRUfPAAAAAElFTkSuQmCC'
    var dragonSlayer = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD40lEQVRYR7WXd4hdZRDFf8cSu0Es2EACEgS7wRg1KgkWMPaGiiJEDbFgbCiIKCY2UIIFIwoSa/6ya9CosaBgieYfQRQ0RIkFG1klUYx65ITvLTdv37337br7wbKvzJ05c2bmzPfEGB7bxwPrJL1eF0b/N77tzYFpkl6Jr/L+ROBS4BBgX0lfjQkA2wcBjwPfA/OBY4DzgB1LwAWSLmtKcsQM2D4TWARsUhPgU+BASf+MGIDt7YHVVSe29wFuBs5ocBzKp0r6oa3EtQzY3gJ4FThJ0oDtCcAdwFlAE3PfAYdK+qYteL5vAjAXOF/SBNsnAE8DmxWnBj4ClgLXAuO6gv0EfAi8CTwnaeWwmtD2AcBy4CHgBWAxsFFx8idwiqQltu8Erm/JND0Q8HMlfdZt25MB288DJwMPl67esvJgmuse4ALgyH5oLjYBci8wT9LqznNDANjO7L7fUudhxB1imh45XdIHPXvAdujKPG87wih/N4xmx+U6YI6kBzdgwPZE4HPgVuDGLhaCPPS/A8wE9qwB+AhwYR/g/wUmdgO4BFgApF4bR1mBt4DbJS21vReQAIc1BMioXl2ZmCYs07sBpNuzQHIyBaHpvbyxHXBpok1bsguA6WUPtBGx3yAA2xmzdGeWS0qQbnVRw0zDacCvZTLOAfbo4T2g0z8LI2Bt0YFdqwCOLjM/W9ITto8qcntRKUk04RZJv9leAhxbCfBHAf1jbOK4j+BrJW1VBXAusEZShCeUTwUiNF8D10n6tnwekfqkIkyrSrZnx66PwB2TZZImD2sb2t4feAPYoXhZARwB/AVEfjsnzdtzzCs2SequRgC2U/etSwkS/MpKE/5e1u36y4btt4EpwGtALif3NejBwPr6S2vbAKT5Lq6h9QpJ91e/s52ldBVwWxnjuoo8IOnyNoqS1Xgg97mDuzwtlzSpK3imKOWZ1mWbbKOqnWR/johlxbcCKNTmXpCMZgN5HZGaIunj7vRsRzMOB6JyUc6oZgLOKbbpjZmSHu08W7cNs+NnSBrMxvbOwKyUW9K8XtyWEuwkaVW50MTumortQkmR8cFTB+DloojjJGW59H1sbwNEqG4Cdqs8uFhSLjYbnDoALwExHh/h6Te67ahf6N2u8kxE6m5JATTkVIUo1+mIT65dM8rV+kngy1LT+ZLWNIGx/SxwarFJ7cPkDZJybe95qgA6Hdz5rPM/jZOm2lvSFy0A8oMkkv4M8G52SRt7VQB5nb+s4ReB44DJQIRmQFJAjPqp64GngOyGqFUtfaOBpg7AY7mSpw8k/TIagVp7oGpgexdgd0nLxjJ4fA9rG44FmP8AahdSzpXkJjIAAAAASUVORK5CYII='
    var demonSlayer = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAD5klEQVRYR82Xa+ifYxzGP5esHOfQHBqtlhojp1AakRxyyik0h5AXmMPEC17whjlHsTEkhxlSTA5FshcrFnKIIoeaHHJsMeaw5nDpWvcz9//Z7/T8l9r97vd77u99X8/3e13X9/uIDWBpA8DAWhC2JwEXAO8Ab0j6+f8CaHs6sB+wWNJ3YzJh+xbgKuBv4EXgMWCppG/WB5DtrYEDgJnAqcBE4D3gYEm/rVMO26cBDwObVxc/AFwqaXUXMLY3As4CFsB/WQfmS7qkOasnJ2xPAT4AtqwuPUnScx1B7Ah824rJy9xT/9eXmLaPAl6uNk+V9HlHEFsBP1VZWCFpm/YZ/TKRGv5YBYcjW0ha1QVE9tp+CTi6itupzbF+IELKY6rA8yWFJ52X7e2B76tAh2+S/ujLCdv7FpnWACdI+qszghJg+zXgoCr+TklX9ARR2PwFsHMVMEvSfeMFUEqyHfBDKxuT4xH5r+0T+wNvVZtXSdp0fQA0sbZXhlfVWfMkze4FYjFweLVxpaSJtuNukWeeXzQKQW3HmG6L1CUdaztKi+Ka9Q+wg6TltW1PBZa1shMSfQVMBjYu0ZHc7ZJu6pUh27sBTwJ7N5QAPgN26bH/HEkLaxBtXxhWhU+AOZIeL3UPj24FTq8ADztjiaTDahCpfdI9Y1hk6/nXxVP2AGLTo65kdB9JX7aJuQlwJXANsFnrtJQmVr7niLeEiDG5GF+9cs79uUNSDHGsOiomB8zxwAnA2WVfgmM8MbF7Ww2ufUkIeT3wLrArEBIuAZ4BFjXSbIKGDjW24xEXloC5ki63fRzwQp+XuFvSZbYPLRcntGfP6AJiGvBRVe81suvRnpszby4ZeBRoPGZM626Xc2gmCvPvyjzRkXjNXVHRdEkpZ881EogCJENIJFgPO4M4+mc4ICmmNXD166KZAyZJinmtXWVMexXYvWQlbxcFRJorgG0LCT8Frpb0/DAAg9QxH5gVefUaeG1HPbkgw/CDwLnld6SdcW6ZpF9HATAIRDiQ5pK+/3srG2ly0yQ9YfttIGX6EEiGjixD7A2SzuwMorTx9IeU6I5yePz/4/Lf6pDL9hnAQ8XMooA8fzO+IGmG7YUF/CnjAfEKcMSAwNmS5tnO4YuAi8vYlkwtLeU7BFie0kg6cTwgnirfBGvE0DKikG+mpKdtHwi8PuSCZyWd3BlEkWGjluuAa4FMxr/UGre9F/B+LZoCum5eCySdNy4QTZDtcCKNbJ3J2Ha+RSLHucCNZaRPb0jDy9dVlPVI/XEzDEw/n5hTMjFFUoaakVcILimgRl79QEwoZtX+ehr54C4bR7btLod23fsvkRxhMZIrA/gAAAAASUVORK5CYII='

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


    // Live update sgb
    $("#sgb").on('change', function() {
        img = $(".sgb-bottom img")
        if ($(this).is(':checked')) {
            img.attr("src", tick)
        } else {
            img.attr("src", cross)
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
        var weaknessEls = $('.weakness-top, .weakness-bottom')
        var img = $(".weakness-top img")
        var icon = demonSlayer

        switch (this.value) {
            case 'undeadSlayer':
                icon = undeadSlayer
                break;
            case 'dragonSlayer':
                icon = dragonSlayer
                break;
            case 'demonSlayer':
                icon = demonSlayer
                break;
            default:
                icon = false
        }

        if (!icon) {
            weaknessEls.hide()
        } else {
            img.attr("src", icon)
            weaknessEls.show()
        }
    })


    // Live update weakness2
    $("#weakness2").on('change', function() {
        var weakness2Els = $('.weakness2-top, .weakness2-bottom')
        var img = $(".weakness2-top img")
        var icon = demonSlayer

        switch (this.value) {
            case 'undeadSlayer':
                icon = undeadSlayer
                break;
            case 'dragonSlayer':
                icon = dragonSlayer
                break;
            case 'demonSlayer':
                icon = demonSlayer
                break;
            default:
                icon = false
        }

        if (!icon) {
            weakness2Els.hide()
        } else {
            img.attr("src", icon)
            weakness2Els.show()
        }
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