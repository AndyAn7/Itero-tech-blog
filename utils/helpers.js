module.exports = {
    format_time: (date) => {
        console.log('Time', date);
        
        return date.toLocaleTimeString();
    },
    format_date: (date) => {
        console.log('Date', date);

        return date.toLocaleDateString();
    }};