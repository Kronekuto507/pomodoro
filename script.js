/* text that changes in the DOM */

const DOMCronometer = document.getElementById("time")
const DOMMainParagraph = document.getElementById("text_advisor")
var seconds_counter = 0
var minutes_counter = 0
const DOMcircle = document.getElementsByClassName("fa-circle")
    /**/


/* dom button */
const playButton = document.getElementsByClassName("temp")[0]
const contentContainer = document.getElementsByClassName("container")[0]
const playIcon = document.getElementsByClassName("fa-play")[0]
const pauseIcon = "fa-pause"

let index = 0


var breakTime = false //flag variable for checking if its breaktime after it has reach the value of timeOfBreaktime
let pomodoro = 0
let startTimer = undefined

const clockAudioEffect = new Audio('ticking-clock.wav') //ticking clock audio effect
const breakTimeAudio = new Audio('relaxing-sound.wav')

function increaseTime(seconds_2) {
    if (seconds_counter < 10) {
        DOMCronometer.textContent = DOMCronometer.textContent.slice(0, 4) + seconds_2.charAt(0)
    } else {
        DOMCronometer.textContent = DOMCronometer.textContent.slice(0, 3) + seconds_2.charAt(0) + seconds_2.charAt(1)

        if (seconds_counter == 60) {
            minutes_counter++
            var minutes_2 = String(minutes_counter)
            if (minutes_counter < 10) {
                DOMCronometer.textContent = DOMCronometer.textContent.charAt(0) + minutes_2.charAt(0) + ":00"
                seconds_counter = 0
            } else {
                DOMCronometer.textContent = minutes_2.charAt(0) + minutes_2.charAt(1) + ":00"
                seconds_counter = 0
            }

        }
    }
}

let timeOfBreaktime = 0
const maxPomodoros = 4
const maxWorkTime = 25

function changeIconFromButton(flag) {
    if (flag == "pause") {
        playIcon.classList.remove("fa-play")
        playIcon.classList.add(pauseIcon)
    } else if (flag == "play") {
        playIcon.classList.remove(pauseIcon)
        playIcon.classList.add("fa-play")
    }
}

function resetAudio(audioObject, time) {
    audioObject.addEventListener("ended", () => {
        audioObject.currentTime = time
        audioObject.play()
    })
}

contentContainer.addEventListener("click", (event) => {
    if (event.target.id == "temp") {
        flag = true
        startTimer = setInterval(() => {
            seconds_counter++
            //Increase the counter, which represents the seconds

            var seconds_2 = String(seconds_counter)

            if (!breakTime) {

                if (minutes_counter == maxWorkTime) {
                    DOMCronometer.textContent = "00:00"
                    minutes_counter = 0
                    breakTime = true
                    DOMcircle[index].style.color = "green"
                    breakTimeAudio.play()
                }

                DOMMainParagraph.textContent = "WORK!"
                increaseTime(seconds_2)
            } else {
                if (pomodoro == maxPomodoros) {
                    timeOfBreaktime = 35
                    for (let i = 0; i < DOMcircle.length; i++) {
                        DOMcircle[i].style.color = "white"
                    }

                } else {
                    timeOfBreaktime = 5
                }

                if (minutes_counter == timeOfBreaktime && pomodoro < maxPomodoros) {
                    breakTimeAudio.pause()
                    DOMCronometer.textContent = "00:00"
                    minutes_counter = 0
                    pomodoro++
                    console.log(pomodoro + "pomodoro")
                    breakTime = false
                    index++
                } else if (minutes_counter == 35) {
                    DOMCronometer.textContent = "00:00"
                    breakTime = false
                    pomodoro = 0
                    index = 0
                    minutes_counter = 0
                }

                DOMMainParagraph.textContent = "Take a break!"
                increaseTime(seconds_2)
            }
            console.log(seconds_2)
            console.log(DOMCronometer.textContent.slice(0, 3))
        }, 0.01)
        event.target.id = "not-temp"
        clockAudioEffect.play()
        changeIconFromButton("play")

    } else {
        clearInterval(startTimer)
        event.target.id = "temp"
        clockAudioEffect.pause()
        changeIconFromButton("pause")
    }

})

resetAudio(clockAudioEffect, 1.45)
    /*button_activation.addEventListener("click", () => {
        flag = true
        startTimer = setInterval(() => {
            seconds_counter++
            //Increase the counter, which represents the seconds

            var seconds_2 = String(seconds_counter)

            if (!breakTime) {
                if (minutes_counter == 25) {
                    getTempo.textContent = "00:00"
                    minutes_counter = 0
                    breakTime = true
                }
                increaseTime(seconds_2)
            } else {
                if (minutes_counter == 5) {
                    getTempo.textContent = "00:00"
                    minutes_counter = 0
                    pomodoro++
                    console.log(pomodoro)
                    breakTime = false
                }
                increaseTime(seconds_2)
            }

            if (minutes_counter == 25) {
                getTempo.textContent = "00:00"
                minutes_counter = 0
            }


            }

            console.log(seconds_2)
            console.log(getTempo.textContent.slice(0, 3))
        }, 1);
    })
    */

/*if (flag) {
    console.log(flag)
    timeCalculation()
}*/