import DateHandler from '@/util/dateHandler'
import moment from 'moment'

const sprintWeek = 'Ready by 0726'
const dateHandler = new DateHandler()
dateHandler.weeklyTag = 'Ready by 0726'
const dateOutOfETA = moment(dateHandler.getFirstDateOfSprint()).add('6', 'd').toISOString()
const dateInETA = moment(dateHandler.getFirstDateOfSprint()).add('3', 'd').toISOString()
const dateBeforeETA = '2019-05-10T14:41:04Z'
const dateWeekTag = dateHandler.getFirstDateOfSprint()
const lastDateOfSprint = dateHandler.getLastDayOfSprint()

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
