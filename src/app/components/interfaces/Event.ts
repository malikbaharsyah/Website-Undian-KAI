export default interface Event {
    event_id: number;
    name: string;
    list_prize_id: number;
    operating_area: string;
    image?: string;
    start_date: Date;
    end_date: Date;
}