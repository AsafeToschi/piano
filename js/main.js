const notas = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"] // Notas

const escala = [
    "4",
    "5"
]
keyList = [
    "65", "87", "83", "69", "68", "70", "84", "71", "89", "72", "85", "74", "75", "79", "76", "80", "186", "222", "221", "220", "100", "103", "101", "104"
]

const sound = []
escala.forEach(escala => {
    notas.forEach((nota, i) => {
        sound.push(new Audio("media/" + nota + escala + ".mp3"))


    })
})

var i = 0
$("#piano div[id^=escala_] div.tile").each(function (index) {
    if( index % 12 == 0 ) {
        i = 0
    }
    var escala = $(this).parent().attr("id")
    escala = escala.split("_")[1]

    var nota = notas[i] + escala
    $(this).attr("id", nota)
    
    $(this).click(function(){
        sound[index].play()
        setTimeout(function(){
            sound[index].pause()
            sound[index].currentTime = 0
        },1500)
    })

    $(document).keydown(function (){
        keyList.forEach((key, index) => {
            if ( event.which == key ) {
                event.preventDefault()
                sound[index].play()
                idElement = sound[0].src.split("/")[6].split(".")[0]
                // alert(idElement)
                $("#" + idElement).addClass("active")
            }
        })

    }).keyup(function (){
        keyList.forEach((key, index) => {
            if ( event.which == key ) {
                event.preventDefault()
                setTimeout(function(){
                    sound[index].pause()
                    sound[index].currentTime = 0
                }, 800)
            }
        })
    })
    i++
})


// // Play note sound
// audio = new Audio("media/5/piano-B5.wav")
// audio.play() 

// // Stop note sound
// audio.pause()
// audio.currentTime = 0