"use strict";

let carParameters = {
    width: 100,
    length: 250,
    speed: 0,
    acceleration: 0,
    posX: 0,
    posY: 0
}

window.addEventListener('keydown', moveCar, false);
window.addEventListener('keyup', moveCar, false);

function spawnCar(carParameters) {
    let car = document.createElement("div");
    car.id = "car";
    car.style.width = carParameters.width + "px";
    car.style.height = carParameters.length + "px";
    car.style.backgroundColor = "rgb(153, 0, 61)";
    car.style.position = "absolute";
    car.style.top = "100px";
    car.style.left = "500px";
    document.body.appendChild(car);
    carParameters.posX = car.offsetLeft;
    carParameters.posY = car.offsetTop;
}

function moveCar(EO){
    EO = EO || window.event;
    EO.preventDefault();
    if (EO.type === "keydown"){
        // Левая платформа
        if (EO.key === "ArrowUp"){
            car.style.top = (car.offsetTop - 5) + "px";
            //carParameters.acceleration = 3;
        }
        if (EO.key === "ArrowDown"){
            car.style.top = (car.offsetTop + 5) + "px";
        }
        // Правая платформа
        if (EO.key === "ArrowLeft"){
            car.style.transform += "rotate(-3deg)";
        }
        if (EO.key === "ArrowRight"){
            car.style.transform += "rotate(3deg)";
        }
    }
}

function changePositions(){
    if (carParameters.acceleration > 0){
        carParameters.speed += carParameters.acceleration;
    }
    if (carParameters.speed > 0){
        car.style.top -= carParameters.speed + "px";
    }

    requestAnimationFrame(changePositions);

    //setTimeout(changePositions, 1000); вроде как юзлес хуйня
}

spawnCar(carParameters);

changePositions();