const notas = [
    "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"
]

const escala = [
    "4",
    "5"
]
keyList = [
    "z", "s", "x", "d", "c", "v", "g", "b", "h", "n", "j", "m", "q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u"
]
keyListLower = [
    "Z", "S", "X", "D", "C", "V", "G", "B", "H", "N", "J", "M", "Q", "@", "W", "#", "E", "R", "%", "T", "¨", "Y", "&", "U"
]


const sound = []
escala.forEach(escala => {
    notas.forEach((nota, i) => {
        sound.push(new Audio("media/" + nota + escala + ".mp3"))
    })
})

var teste
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
        n = sound[index].cloneNode()
        n.play()
    })

    pressedKey = []
    $(document).keydown(function (eventKey){
        play = true

        keyList.forEach((key, index) => {
            if ( eventKey.key === key ) {
                
                pressedKey.forEach(function(pressedKey){
                    if (key === pressedKey) {
                        play = false
                    }
                })


                if(play == true){
                    pressedKey.push(key)

                    event.preventDefault()
                    var n = sound[index].cloneNode()
                    n.play()
                    var srcArray = sound[index].src.split("/")
                    var idElement = srcArray[srcArray.length - 1].split(".")[0]
                    $("#" + idElement).addClass("active")
                }
            }
        })
        keyListLower.forEach((key, index) => {
            if ( eventKey.key === key ) {
                
                pressedKey.forEach(function(pressedKey){
                    if (key === pressedKey) {
                        play = false
                    }
                })


                if(play == true){
                    pressedKey.push(key)

                    event.preventDefault()
                    var n = sound[index].cloneNode()
                    n.volume = 0.35
                    n.playbackRate = 2
                    n.play()
                    var srcArray = sound[index].src.split("/")
                    var idElement = srcArray[srcArray.length - 1].split(".")[0]
                    $("#" + idElement).addClass("active")
                }
            }
        })
    }).keyup(function (eventKey){
        keyList.forEach((key, index) => {
            indexToRemove = pressedKey.findIndex(arrayItem => arrayItem === key)
            pressedKey.splice(indexToRemove, 1)


            var srcArray = sound[index].src.split("/")
            var idElement = srcArray[srcArray.length - 1].split(".")[0]
            $("#" + idElement).removeClass("active")
        })

        keyListLower.forEach((key, index) => {
            indexToRemove = pressedKey.findIndex(arrayItem => arrayItem === key)
            pressedKey.splice(indexToRemove, 1)


            var srcArray = sound[index].src.split("/")
            var idElement = srcArray[srcArray.length - 1].split(".")[0]
            $("#" + idElement).removeClass("active")
        })
    })
    i++
})