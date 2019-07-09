import DateHandler from '@/util/dateHandler'

const sprintWeek = 'weekly 0513'
const dateHandler = new DateHandler()
const dateOutOfETA = '2019-05-18T14:41:04Z'
const dateInETA = '2019-05-16T14:41:04Z'
const dateBeforeETA = '2019-05-10T14:41:04Z'
const dateWeekTag = '2019-05-13T06:00:00.000Z'
const lastDateOfSprint = '2019-05-18T06:00:00.000Z'
dateHandler.weeklyTag = 'weekly 0513'

describe('Date Handler', () => {
  test('should return date of sprint', () => {
    expect(dateHandler.getFirstDateOfSprint().toDate())
      .toEqual(new Date(dateWeekTag))
  })
  test('should return last date of sprint', () => {
    expect(dateHandler.getLastDayOfSprint().toDate())
      .toEqual(new Date(lastDateOfSprint))
  })
  test('should return 3 days of Sprint', () => {
    expect(dateHandler.daysOfSprint(sprintWeek, dateInETA)).toBe(3)
  })
  test('should return day of the week', () => {
    expect(dateHandler.getWeekDay(dateWeekTag)).toBe('Monday')
  })
  describe('is Out of ETA', () => {
    test('Should be out of ETA', () => {
      expect(dateHandler.isOutOfETA(sprintWeek, dateOutOfETA)).toBeTruthy()
    })
    test('Should be on ETA', () => {
      expect(dateHandler.isOutOfETA(sprintWeek, dateInETA)).toBeFalsy()
    })
  })
  describe('Within Sprint function', () => {
    test('Date before sprint should be out of ETA', () => {
      expect(dateHandler.withinSprint(sprintWeek, dateBeforeETA)).toBeFalsy()
    })
    test('Date after sprint should be out of ETA', () => {
      expect(dateHandler.withinSprint(sprintWeek, dateOutOfETA)).toBeFalsy()
    })
    test('Date on sprint should be on ETA', () => {
      expect(dateHandler.withinSprint(sprintWeek, dateInETA)).toBeTruthy()
    })
  })
})
