export class Car {
    #brand = "BMW";
    #model = "M5";
    #yearOfManufacturing = 2021;
    #maxSpeed = 300;
    #maxFuelVolume = 20;
    #fuelConsumption = 5;
    #currentFuelVolume = 0;
    #isStarted = false;
    #mileage = 0;

    get brand(){
        return this.#brand
    }

    set brand(brand){
        if(typeof brand !== 'string' || brand.length > 50 || brand.trim().length === 0){
            throw new Error('Некорректное имя бренда')
        }
        this.#brand = brand
    }

    get model(){
        return this.#model
    }

    set model(model){
        if(typeof model !== 'string' || model.length > 50 || model.trim().length === 0){
            throw new Error('Некорректное имя модели')
        }
        this.#model = model
    }

    get yearOfManufacturing(){
        return this.#yearOfManufacturing
    }

    set yearOfManufacturing(year){
        if(!Number.isSafeInteger(year) || year < 1900 || year > new Date().getFullYear()){
            throw new Error('Некорректный год изготовления')
        }
        this.#yearOfManufacturing = year
    }

    get maxSpeed(){
        return this.#maxSpeed
    }

    set maxSpeed(maxSpeed){
        if(typeof maxSpeed !== 'number'
        || Number.isNaN(maxSpeed)
        || !Number.isFinite(maxSpeed)
        || maxSpeed < 100
        || maxSpeed > 300){
            throw new Error('Некорректная максимальная скорость')
        }
        this.#maxSpeed = maxSpeed
    }

    get maxFuelVolume(){
        return this.#maxFuelVolume
    }

    set maxFuelVolume(maxFuelVolume){
        if(typeof maxFuelVolume !== 'number'
        || Number.isNaN(maxFuelVolume)
        || !Number.isFinite(maxFuelVolume)
        || maxFuelVolume < 5
        || maxFuelVolume > 20) {
            throw new Error('Некорректный максимальный уровень топлива')
        }
        this.#maxFuelVolume = maxFuelVolume
    }

    get fuelConsumption(){
        return this.#fuelConsumption
    }

    set fuelConsumption(fuelConsumption){
        if(typeof fuelConsumption !== 'number'
        || Number.isNaN(fuelConsumption)
        || !Number.isFinite(fuelConsumption)
        || fuelConsumption <= 0){
            throw new Error('Некорректный расход топлива')
        }
        this.#fuelConsumption = fuelConsumption
    }

    get currentFuelVolume(){
        return this.#currentFuelVolume
    }

    get isStarted(){
        return this.#isStarted
    }

    get mileage(){
        return this.#mileage
    }

    start() {
        if(this.#isStarted){
            throw new Error('Машина уже заведена')
        } else {
            this.#isStarted = true;
        }

    }

    shutDownEngine() {
        if(!this.#isStarted){
            throw new Error('Машина ещё не заведена')
        } else {
            this.#isStarted = false;
        }
    }

    fillUpGasTank(liters) {
        if(typeof liters !== 'number' || Number.isNaN(liters) || !Number.isFinite(liters) || liters <= 0) {
            throw new Error('Неверное количество топлива для заправки')
        } else if(!this.#maxFuelVolume){
            throw new Error('Установите максимальный уровень топлива')
        } else if(liters > (this.#maxFuelVolume - this.#currentFuelVolume)){
            throw new Error('Топливный бак переполнен')
        }
        this.#currentFuelVolume += liters
    }

    drive(speed, hours){
        let tripDistanse = speed * hours;
        let litresForTrip = tripDistanse * this.#fuelConsumption / 100;
        if(typeof speed !== 'number' || Number.isNaN(speed) || !Number.isFinite(speed) || speed <= 0){
            throw new Error('Неверная скорость')
        } else if(!this.#maxSpeed){
            throw new Error('Установите максимальную скорость')
        } else if(typeof hours !== 'number' || Number.isNaN(hours) || !Number.isFinite(hours) || hours <= 0){
            throw new Error('Неверное количество часов')
        } else if(speed > this.#maxSpeed){
            throw new Error('Машина не может ехать так быстро')
        } else if(!this.#isStarted){
            throw new Error('Машина должна быть заведена, чтобы ехать')
        } else if(!this.#fuelConsumption){
            throw new Error('Установите расход топлива')
        } else if(this.#currentFuelVolume < litresForTrip){
            throw new Error('Недостаточно топлива')
        }
        this.#currentFuelVolume -= litresForTrip;
        this.#mileage += tripDistanse;
    }
}