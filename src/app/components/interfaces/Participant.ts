export default interface Participant {
    participant_id: number;
    nipp: string;
    name: string;
    operating_area: string;
    address?: string;
    event_id: number;
}