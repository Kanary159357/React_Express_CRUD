const extractDate = (date: Date) => {
	const data = {
		year: date.getUTCFullYear(),
		date: date.getDate(),
		month: date.getMonth(),
		hour: date.getHours(),
		min: date.getMinutes(),
	};
	return {
		...data,
		fullDate: `${data.year}년 ${data.month}월 ${data.date}일`,
		fullTime: `${data.hour}시 ${data.month}분`,
	};
};

export default extractDate;
