export class CoordinatesDTO {
    constructor(id=-1, x, y, ownerId=-1) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.ownerId = ownerId;
    }
}

export class DragonCaveDTO {
    constructor(id=-1, numberOfTreasures, ownerId=-1) {
        this.id = id;
        this.numberOfTreasures = numberOfTreasures;
        this.ownerId = ownerId;
    }
}

export class PersonDTO {
    constructor(id=-1, name, eyeColor, hairColor, location, birthday, height, ownerId=-1) {
        this.id = id;
        this.name = name;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
        this.location = location;
        this.birthday = birthday;
        this.height = height;
        this.ownerId = ownerId;
    }
}

export class LocationDTO {
    constructor(id=-1, x, y, z, ownerId=-1) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.ownerId = ownerId;
    }
}

export class DragonHeadDTO {
    constructor(id=-1, eyesCount, toothCount, ownerId=-1) {
        this.id = id;
        this.eyesCount = eyesCount;
        this.toothCount = toothCount;
        this.ownerId = ownerId;
    }
}

export class DragonDTO {
    constructor(
        id=-1,
        name,
        coordinates,
        cave,
        killer = null,
        age = 0,
        description = null,
        wingspan,
        character = null,
        head = null,
        ownerId=-1
    ) {
        // проверка на обязательные поля и их валидность
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error('Name cannot be null or empty');
        }
        if (!coordinates || !(coordinates instanceof CoordinatesDTO)) {
            throw new Error('Coordinates cannot be null');
        }
        if (!cave || !(cave instanceof DragonCaveDTO)) {
            throw new Error('Cave cannot be null');
        }
        if (age <= 0) {
            throw new Error('Age must be greater than 0');
        }
        if (!wingspan || wingspan <= 0) {
            throw new Error('Wingspan must be greater than 0');
        }

        // установка значений свойств
        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
        this.cave = cave;
        this.killer = killer;
        this.age = age;
        this.description = description;
        this.wingspan = wingspan;
        this.character = character;
        this.head = head;
        this.ownerId = ownerId;
    }
}
