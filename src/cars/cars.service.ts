import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneBy(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  create(createCarDto: CreateCarDTO) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);
    return car;
  }
  updte(id: string, updateCarDTO: UpdateCarDTO) {
    let carDB = this.findOneBy(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDTO, id };
        return carDB;
      }
      return car;
    });
  }
  delete(id: string) {
    const carDB = this.findOneBy(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
