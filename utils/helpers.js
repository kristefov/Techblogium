/* This code exports an object with a single method called `format_date`. The `format_date` method
takes a `date` parameter and returns a formatted string representing the date in the format of the
current locale. This code is likely part of a larger module or application that needs to format
dates in a consistent way. */
module.exports = {
    format_date: (date) => {
      return date.toLocaleDateString();
    }
}