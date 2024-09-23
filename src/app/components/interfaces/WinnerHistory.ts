export default interface WinnerHistory {
    winner_history_id: number;
    event_id: number;
    participant_id?: number;
    prize_id?: number;
    operating_area?: string;
    timestamp: Date;
}