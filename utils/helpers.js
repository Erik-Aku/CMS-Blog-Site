module.exports = {
  format_date: date => {
    const newDate = new Date(date).toLocaleDateString();
    return newDate;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
};
