import { createEvent,getDateCalendar,NUM_DAY } from './functions'

beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2021-12-07T10:20:30Z').getTime())
})

const weekday = 'mon';
const week = 1;
const openHour = 6;
const closeHour = 12;
test('Validation a event title and content basic', () => {
    const result = createEvent(weekday, week, openHour, closeHour);
    const duration = [closeHour - openHour, "hour"]
    
    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual(duration);
});

test('Validation start date', () => {
    const numDay = NUM_DAY[weekday];
    const currentDay = new Date().getDay();
    const hour = new Date().getHours();
    const date=getDateCalendar(numDay,currentDay,hour,week,closeHour)
    const result = createEvent(weekday, week, openHour, closeHour);
    expect(result.start).toStrictEqual(date);
});

test('Validation date', () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const numDay = NUM_DAY[weekday];
    const currentDay = new Date().getDay();
    const hour = new Date().getHours();
    const date=getDateCalendar(numDay,currentDay,hour,week,closeHour)
    const result = createEvent(weekday, week, openHour, closeHour);
    const dateResult=new Date(date).toLocaleDateString('es-ES', options);
    expect(result.date).toStrictEqual(dateResult);
});

//validar argumnets

//como retorna una funcion debe ser llamada por otra funcion
//toThrowError responde a un throw generado por un retorno puede poner un mensaje o
//con toThrow puede decir que .toThrow(Error) error es el objeto que retorna

test('dia de la semana', () => {
    const result =()=>{ createEvent("hola", week, openHour, closeHour)};
    expect(result).toThrowError("Argumento ilegal el dia de la semana, valores posibles; 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' y 'sun'.")
})
test('horas menores a 0', () => {
    const result =()=>{ createEvent(weekday, week, 3, 2)};
    expect(result).toThrowError("Argumento ilegal en el horario de entrada.")
})
test('semana menor a 0', () => {
    const result =()=>{ createEvent(weekday, -1, openHour, closeHour)};
    expect(result).toThrowError("Argumento ilegal para la semana, debe ser un valor positivo.")
})

test('create an event list of at least 10 events', () => {
    const list=[ {
        weekday: 'mon',
        week: 1,
        openHour: 8,
        closeHour: 12
    },
    {
        weekday: 'tue',
        week: 2,
        openHour: 8,
        closeHour: 12
    },
    {
        weekday: 'wed',
        week: 3,
        openHour: 8,
        closeHour: 12
    },
    {
        weekday: 'thu',
        week: 4,
        openHour: 8,
        closeHour: 12
    },
    {
        weekday: 'fri',
        week: 5,
        openHour: 8,
        closeHour: 12
    },
    {
        weekday: 'sat',
        week: 1,
        openHour: 8,
        closeHour: 12
    },
    {
        weekday: 'sun',
        week: 8,
        openHour: 8,
        closeHour: 12
    },
    {
        weekday: 'thu',
        week: 1,
        openHour: 8,
        closeHour: 12
    },
    {
        weekday: 'wed',
        week: 8,
        openHour: 8,
        closeHour: 12
    },
    {
        weekday: 'thu',
        week: 1,
        openHour: 8,
        closeHour: 12
    }
    ]
    list.map((item)=>{
        const result=createEvent(item.weekday, item.week, item.openHour, item.closeHour)
        const duration = [item.closeHour - item.openHour, "hour"]
    
        expect(result.title).toBe("[SOFKA U] Meeting Room");
        expect(result.description).toBe("Mentoring and Practice");
        expect(result.duration).toEqual(duration);
    })
});

