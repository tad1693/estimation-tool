import DateHandler from '@/util/dateHandler'

const dateHandler = new DateHandler()
dateHandler.weeklyTag = 'weekly 0513'

describe('Date Handler', () => {
  test('should return date of sprint', () => {
    expect(dateHandler.getFirstDateOfSprint().toDate())
      .toEqual(new Date('2019-05-13T06:00:00.000Z'))
  })
  test('should return last date of sprint', () => {
    expect(dateHandler.getLastDayOfSprint().toDate())
      .toEqual(new Date('2019-05-21T06:00:00.000Z'))
  })
  test('Should be out of ETA', () => {
    expect(dateHandler.isOutOfETA('weekly 0513', '2019-05-21T14:41:04Z')).toBeTruthy()
  })
  test('Should be on ETA', () => {
    expect(dateHandler.isOutOfETA('weekly 0513', '2019-05-16T14:41:04Z')).toBeFalsy()
  })
})
