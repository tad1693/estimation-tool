import moment from 'moment'

export default class DateHandler {
  weeklyTag = ''
  /**
   * Get the initial date of the sprint base on the weekly tag
   * @param {String} [date] - Weekly tag
   * @return {moment.Moment}
   */
  getFirstDateOfSprint (date) {
    let weekString = (date || this.weeklyTag).split(' ')[1]
    let week = `${weekString.substring(0, 2)}-${weekString.substring(2, 4)}-19`
    // console.log('weekString', week)
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
}
