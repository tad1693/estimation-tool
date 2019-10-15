import moment from 'moment'

export default class DateHandler {
  weeklyTag = ''

  /**
   * Get the initial date of the sprint base on the weekly tag
   * @param {String} [date] - Weekly tag
   * @return {moment.Moment}
   */
  getFirstDateOfSprint (date) {
    let weekString = (date || this.weeklyTag).replace(/-/g, '')
    weekString = weekString.substring(weekString.length - 4)
    let week = `${weekString.substring(0, 2)}-${weekString.substring(2, 4)}-19`
    return moment(week, 'MM-DD-YY')
  };

  /**
   * Return if the date is in the Weekly sprint
   * @param [sprintWeek] - Weekly tag
   * @param {String} [date] - Date story was accepted
   * @return {boolean}
   */
  isOutOfETA (sprintWeek, date) {
    let ldow = this.getLastDayOfSprint(sprintWeek)
    let delivered = moment(date)
    let diff = delivered.diff(ldow, 'd', true)
    // console.log(diff)
    return (diff > 0)
  };

  /**
   * Return the last day of the weekly sprint
   * @param {String} [sprintWeek] - Weekly tag
   * @return {moment.Moment}
   */
  getLastDayOfSprint (sprintWeek) {
    let weeklySprint = sprintWeek || this.weeklyTag
    return this.getFirstDateOfSprint(weeklySprint).add('5', 'd')
  };

  /**
   * Return if the date was within the sprint week
   * @param [sprintWeek] - Weekly tag
   * @param {String} [date] - Date story was created
   * @return {boolean}
   */
  withinSprint (sprintWeek, date) {
    let ldow = this.getLastDayOfSprint(sprintWeek)
    let fdow = this.getFirstDateOfSprint(sprintWeek)
    let delivered = moment(date)
    let diffIn = delivered.diff(ldow, 'd', true)
    let diffOut = delivered.diff(fdow, 'd', true)
    return (diffIn < 0 && diffOut > 0)
  };

  /**
   * Calculate the days of the sprint
   * @param [sprintWeek] - Weekly tag
   * @param {String} lastDate - day of the last story
   * @return {number}
   */
  daysOfSprint (sprintWeek, lastDate) {
    let fdow = this.getFirstDateOfSprint(sprintWeek)
    let now = (lastDate === 'working') ? moment() : moment(lastDate)
    return Math.trunc(now.diff(fdow, 'd', true))
  };

  /**
   * Return the day of the week
   * @param {String} date - Date to be formatted
   * @return {string}
   */
  getWeekDay (date) {
    return moment(date).format('dddd')
  };
}
