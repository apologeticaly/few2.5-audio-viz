

const playButton = document.getElementById('button-play')
const pauseButton = document.getElementById('button-pause')

playButton.addEventListener('click', (e) => {
  startAudio()
  console.log(frequencyArray)
  console.log('yo')
})

let is_playing = false
let analyzer
let frequencyArray
let audio

function startAudio() {
    is_playing = true
    const audio = new Audio()
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    audio.src = 'bird.wav'

    // --------------------------------------------------------
    // Create an audio analyser
    analyser = audioContext.createAnalyser()
    // Create an audio source
    const source = audioContext.createMediaElementSource(audio)
    // Connect the source to the analyser
    source.connect(analyser)
    // Connect the analyser to the audio context
    analyser.connect(audioContext.destination)
    // Get an array of audio data from the analyser
    frequencyArray = new Uint8Array(analyser.frequencyBinCount)
    // --------------------------------------------------------

    
    audio.play()

    pauseButton.addEventListener('click', (e) => {
        audio.pause()
        is_playing = false
    })
    
    requestAnimationFrame(render)
}

function getColor(x) {
    if (x%2 == 15) {
        return 'blue'
    }

    else {
        return 'white'
    }
}

function render() {

    if (is_playing === false) {
        return
    }
    
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    var grd = ctx.createLinearGradient(0, 0, 1500, 500);
    grd.addColorStop(0, "#c3e29e");
    grd.addColorStop(0.666, "#e0e29e");
    grd.addColorStop(1, "#e29e9e");

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = canvas.width / 5

    // -----------------------------------------------
    ctx.clearRect(0, 0, 1500, 500)
    ctx.beginPath()
    // ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = 'white'
    ctx.stroke()
    ctx.rect(0,0,1500, 500)
    ctx.fillStyle=grd;
    ctx.fill()

    // ----------------------------------------------
    const bars = 600
    const step = canvas.width / bars

    analyser.getByteFrequencyData(frequencyArray)

    frequencyArray.forEach((f, i) => {
        const barLength = frequencyArray[i]
        const x1 = (step * i + 2)
        const y1 = 600
        const x2 = (step * i + 2)
        const y2 = (canvas.height) - barLength
    
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.lineWidth = 2;
        ctx.strokeStyle = getColor(i)
        ctx.stroke()
        // ctx.stroke();
    })


    // --------------------------------------------
    // frequencyArray.forEach((f, i) => {
    //     const barLength = frequencyArray[i] * 0.5
    //     const x1 = (Math.cos(step * i) * radius) + centerX
    //     const y1 = (Math.sin(step * i) * radius) + centerY
    //     const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
    //     const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY

    //     ctx.moveTo(x1, y1)
    //     ctx.lineTo(x2, y2)
    // })

    ctx.stroke()
    // -------------------------------------------------

    requestAnimationFrame(render)
}

// function render() {

//     if (is_playing === false) {
//         return
//     }
    
//     const canvas = document.getElementById('canvas')
//     const ctx = canvas.getContext('2d')

//     const centerX = canvas.width / 2
//     const centerY = canvas.height / 2
//     const radius = canvas.width / 5
//     // -----------------------------------------------
//     ctx.clearRect(0, 0, 300, 300)
//     ctx.beginPath()
//     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
//     ctx.strokeStyle = 'red'
//     ctx.stroke()
//     // ----------------------------------------------

    
//     const bars = 200
//     const step = Math.PI * 2 / bars

//     analyser.getByteFrequencyData(frequencyArray)

//     // --------------------------------------------
//     frequencyArray.forEach((f, i) => {
//         const barLength = frequencyArray[i] * 0.5
//         const x1 = (Math.cos(step * i) * radius) + centerX
//         const y1 = (Math.sin(step * i) * radius) + centerY
//         const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
//         const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY

//         ctx.moveTo(x1, y1)
//         ctx.lineTo(x2, y2)
//     })

//     ctx.stroke()
//     // -------------------------------------------------

//     requestAnimationFrame(render)
// }