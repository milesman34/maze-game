import Player from "./Player";
import { Point } from "../Point";
import { GameState } from "../enums";
import { Room } from "./rooms/Room";
import RoomTemplate from "./rooms/RoomTemplate";

type Game = {
    state: GameState,
    room: Room,
    player: Player,
    score: number,
    roomMap: Record<string, Room>,
    getState: () => GameState,
    setState: (state: GameState) => void,
    getRoom: () => Room,
    setRoom: (room: Room) => void,
    loadRoom: (roomTemplate: RoomTemplate, position?: Point) => void,
    getScore: () => number,
    setScore: (score: number) => void,
    addScore: (score: number) => void,
    getPlayer: () => Player,
    getCenterOffset: () => Point,
    handleKeypress: (key: string) => void
}

// This object handles the game state management
const Game = (state: GameState) => {
    let object: Game = {
        // Current game state
        state,

        // Current room
        room: null,

        // Player object
        player: null,

        // Current score
        score: 0,

        // Maps room names to loaded rooms
        roomMap: {},

        // Gets the current game state
        getState(): GameState {
            return this.state;
        },

        // Sets the new game state
        setState(state: GameState) {
            this.state = state;
        },

        // Gets the current room
        getRoom(): Room {
            return this.room;
        },

        // Sets the current room
        setRoom(room: Room) {
            this.room = room;
        },

        // Loads a room from a template
        // Starting position can optionally be provided
        loadRoom(roomTemplate: RoomTemplate, position: Point = null) {
            // Unloads old room if needed
            if (this.room !== null) {
                this.room.unload();
            }

            const roomName = roomTemplate.getName();

            if (roomName in this.roomMap) {
                this.room = this.roomMap[roomName];
            } else {
                this.room = Room.loadFromTemplate(this, roomTemplate);
                this.roomMap[roomName] = this.room;
            }

            this.player = Player({
                game: this,
                position: position === null ? this.room.getStartPos() : position,
                room: this.room
            });

            this.player.draw();

            this.room.draw();
        },

        // Gets the current score
        getScore(): number {
            return this.score;
        },

        // Sets the current score
        setScore(score: number) {
            this.score = score;
            $("#score-container").text(`Score: ${score}`);
        },

        // Adds to the current score
        addScore(amount: number) {
            this.setScore(this.score + amount);
        },

        // Gets the current player
        getPlayer(): Player {
            return this.player;
        },

        // Gets the current center offset for the room
        getCenterOffset(): Point {
            return this.room.getCenterOffset();
        },

        // Handles a keypress (pass event.key)
        handleKeypress(key: string) {
            if (this.state === GameState.Game) {
                this.player.handleKeypress(key);
            }
        }
    }

    object.setScore(0);

    return object;
};

export default Game