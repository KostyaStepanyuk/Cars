"use strict";

let carConstants = {
    WIDTH: 50,
    LENGTH: 125,
    MAX_SPEED: 10
}

let carParameters = {
    speed: 0,
    acceleration: 0,
    currentAngle: 0,
    posX: 0,
    posY: 0
}

window.addEventListener('keydown', moveCar, false);
window.addEventListener('keyup', moveCar, false);

function spawnCar(carParameters) {
    let car = document.createElement("div");
    car.id = "car";
    car.style.width = carConstants.WIDTH + "px";
    car.style.height = carConstants.LENGTH + "px";
    car.style.backgroundColor = "rgb(153, 0, 61)";
    car.style.position = "absolute";
    car.style.top = "400px";
    car.style.left = "900px";
    document.body.appendChild(car);
    carParameters.posX = car.offsetLeft;
    carParameters.posY = car.offsetTop;
}

function gas(car, EO){
    if (EO.key === "ArrowUp"){
        if (EO.type === "keydown"){
            carParameters.acceleration = 1;
            carParameters.speed += carParameters.acceleration;
        }
        if (EO.type === "keyup"){
            carParameters.acceleration = -1;

            changeSpeed();



            carParameters.speed += carParameters.acceleration;
        }
    }
    checkMaxSpeed(carParameters);
}

function changeSpeed(){
    if (carParameters.acceleration < 0){
        while (speed >= 0){
            carParameters.speed += carParameters.acceleration;
        }
        carParameters.acceleration = 0;
    }
}

function checkMaxSpeed(carParameters){
    if (carParameters.speed > 0 && carParameters.speed >= carConstants.MAX_SPEED){
        carParameters.speed = carConstants.MAX_SPEED;
        carParameters.acceleration = 0;
    }
    if (carParameters.speed < 0 && carParameters.speed <= -carConstants.MAX_SPEED){
        carParameters.speed = -carConstants.MAX_SPEED;
        carParameters.acceleration = 0;
    }
}

function moveCar(EO){
    EO = EO || window.event;
    EO.preventDefault();
    if (EO.type === "keydown"){
        if (EO.key === "ArrowUp"){
            carParameters.acceleration = 1;
            //car.style.top = (car.offsetTop - 5) + "px";
        }
        if (EO.key === "ArrowDown"){
            carParameters.acceleration = -1;
        }
        if (EO.key === "ArrowLeft"){
            carParameters.currentAngle -= 3;
            car.style.transform = "rotate(" + carParameters.currentAngle + "deg)";
            
        }
        if (EO.key === "ArrowRight"){
            carParameters.currentAngle += 3;
            car.style.transform = "rotate(" + carParameters.currentAngle + "deg)";
        }
    }
    if (EO.type === "keyup"){
        if (EO.key === "ArrowUp"){
            carParameters.acceleration = -1;
            //car.style.top = (car.offsetTop - 5) + "px";
        }
        if (EO.key === "ArrowDown"){
            carParameters.acceleration = 1;
        }
        if (EO.key === "ArrowLeft"){
            carParameters.currentAngle -= 3;
            car.style.transform = "rotate(" + carParameters.currentAngle + "deg)";
            
        }
        if (EO.key === "ArrowRight"){
            carParameters.currentAngle += 3;
            car.style.transform = "rotate(" + carParameters.currentAngle + "deg)";
        }
    }
}

function displayCarParameters(){
    let carParametersScreen = document.querySelector(".carParametersScreen");
    carParametersScreen.innerHTML = "Speed: " + carParameters.speed + "\n" +
                                    "Acceleration: " + carParameters.acceleration + "\n";
}

function changePositions(){
    displayCarParameters();

    if (carParameters.acceleration > 0){
        if (carParameters.speed < carConstants.MAX_SPEED){
            carParameters.speed += carParameters.acceleration;
        }
    }
    else{
        if (carParameters.speed > -carConstants.MAX_SPEED){
            carParameters.speed += carParameters.acceleration;
        }
    }

    if (carParameters.speed > 0){
        car.style.top = (car.offsetTop - carParameters.speed) + "px";
    }
    // else{
    //     car.style.top = (car.offsetTop + carParameters.speed) + "px";
    // }

    requestAnimationFrame(changePositions);

    //setTimeout(changePositions, 1000); // вроде как юзлес хуйня
}

spawnCar(carParameters);

changePositions();