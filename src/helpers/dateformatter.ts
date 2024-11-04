
class DateFormatter {
    private ZeroPadding(nr:number):string {
        return nr > 9 ? nr.toString() : "0" + nr;
    }
    public FullDate(date:Date):string {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${this.ZeroPadding(year)}-${this.ZeroPadding(month)}-${this.ZeroPadding(day)} ${this.ZeroPadding(hours)}:${this.ZeroPadding(minutes)}`;

    }
}

export default DateFormatter;

