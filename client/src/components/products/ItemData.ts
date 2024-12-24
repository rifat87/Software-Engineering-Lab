export interface Item {
    id : number;
    name : string;
    quantity : number;
    image : string;
}

export const items: Item[] = [
    {id: 1, name: "Arduino UNO R3", quantity : 20, image: '/items/arduino.png'},
    {id: 2, name: "Ultrasonic Sensor", quantity: 25, image: '/items/ultrasonic.png'},
    {id: 3, name: "IR Sensor", quantity: 15, image: '/items/irsensor.png'},
    {id: 4, name: "Servo Motor", quantity: 22, image: '/items/servo.png'},
    {id: 5, name: "Gear Motor", quantity: 30, image: '/items/gearmotor.png'},
    {id: 6, name: "DHT11", quantity: 25, image: '/items/dht11.png'},
    {id: 7, name: "Gas Sensor", quantity: 20, image: 'items/gassensor.png'},
    {id: 8, name: "Gas Sensor", quantity: 20, image: 'items/gassensor.png'},
    {id: 9, name: "Gas Sensor", quantity: 20, image: 'items/gassensor.png'},
    {id: 10, name: "Gas Sensor", quantity: 20, image: 'items/gassensor.png'},
    {id: 11, name: "Gas Sensor", quantity: 20, image: 'items/gassensor.png'},
    {id: 12, name: "Gas Sensor", quantity: 20, image: 'items/gassensor.png'},
    {id: 13, name: "Gas Sensor", quantity: 20, image: 'items/gassensor.png'},
    {id: 14, name: "Gas Sensor", quantity: 20, image: 'items/gassensor.png'},
]
