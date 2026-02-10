import moment from 'moment';

export default function useDate() {
    const GetNowDateYYYYMMDD = () => {
        const now = moment().format();
        const DateText = GetDateYYYYMMDD(now);
        return DateText;
    };
    const GetNowDateDDMMYYYY = () => {
        const now = moment().format();
        const DateText = GetDateDDMMYYYY(now);
        return DateText;
    };

    const  GetNowDateTimeYYYYMMDDHHmm= () => {
        const now = moment().format();
        const DateText = GetDateTimeYYYYMMDDHHmm(now);
        return DateText;
    };

    const  GetNowDateTimeDDMMYYYYHHmm= () => {
        const now = moment().format();
        const DateText = GetDateTimeDDMMYYYYHHmm(now);
        return DateText;
    };

    const GetDateTimeDDMMYYYYHHmm =  (date) => {
        const DateText = moment(date).format('DD/MM/yyyy HH:mm')
        return DateText;
    };

    const GetDateYYYYMMDD =  (date) => {
        const DateText = moment(date).format('yyyy/MM/DD')
        return DateText;
    };

    const GetDateTimeYYYYMMDDHHmm =  (date) => {
        const DateText = moment(date).format('yyyy/MM/DD HH:mm')
        return DateText;
    };

    const GetDateDDMMYYYY =  (date) => {
        const DateText = moment(date).format('DD/MM/yyyy')
        return DateText;
    };

    const GetDateTimeHHmmDDMMYYYY =  (date) => {
        const DateText = moment(date).format('HH:mm DD/MM/yyyy')
        return DateText;
    };

    const GetDateTimeDDMMHHmm =  (date) => {
        const DateText = moment(date).format('DD/MM HH:mm')
        return DateText;
    };


    return {
        GetNowDateYYYYMMDD,
        GetNowDateTimeYYYYMMDDHHmm,
        GetNowDateTimeDDMMYYYYHHmm,
        GetDateTimeDDMMYYYYHHmm,
        GetDateYYYYMMDD,
        GetDateTimeYYYYMMDDHHmm,
        GetDateDDMMYYYY,
        GetDateTimeHHmmDDMMYYYY,
        GetDateTimeDDMMHHmm,
        GetNowDateDDMMYYYY
    };

}