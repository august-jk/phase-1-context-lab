/* Your Code Here */
const createEmployeeRecord = employee => {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
const createEmployeeRecords = employees => {
    return employees.map(createEmployeeRecord);
}
const createTimeInEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const clockIn = {
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(clockIn);
    return this;
}
const createTimeOutEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const clockOut = {
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(clockOut);
    return this;
}
const hoursWorkedOnDate = function(targetDate) {
    const clockIn = this.timeInEvents.find(clockIn => clockIn.date === targetDate);
    const clockOut = this.timeOutEvents.find(clockOut => clockOut.date === targetDate);
    return (clockOut.hour - clockIn.hour) / 100;
}
const wagesEarnedOnDate = function(targetDate) {
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
const findEmployeeByFirstName = function(array, firstName) {
    return array.find(employee => employee.firstName === firstName);
}
const calculatePayroll = function(array) {
    return array.reduce((total, employee) => {
        return total + allWagesFor.call(employee)
    }, 0)
}