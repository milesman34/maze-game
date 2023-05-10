import * as $ from "jquery"
import Game from "../Game"
import Player from "../Player"
import { Room, RoomLink } from "../rooms/Room"
import { RoomCollection } from "../rooms/RoomTemplate"
import { LevelTemplate } from "./LevelTemplate"
import { Color } from "../../utils/types"

// This object represents a level in the game
// Each level has a series of rooms
type Level = {
    game: Game,
    startingRoom: string,
    name: string,
    rooms: RoomCollection,
    room: Room
    score: number,
    player: Player,
    roomMap: Record<string, Room>,
    collectedKeys: Record<Color, number>,
    getScore: () => number,
    setScore: (score: number) => void,
    addScore: (score: number) => void,
    getPlayer: () => Player,
    getRoom: () => Room,
    setRoom: (room: Room) => void,
    getRoomWithName: (name: string) => Room,
    load: () => void,
    loadRoom: (roomLink: RoomLink) => void,
    deletePlayerSprite: () => void,
    collectKey: (color: Color) => void
}

type LevelParams = {
    game: Game,
    startingRoom: string,
    name: string,
    rooms: RoomCollection
}

const Level = ({ game, startingRoom, name, rooms = {} }: LevelParams): Level => {
    let object: Level = {
        // Reference to the game
        game,
        
        // Starting room
        startingRoom,
        
        // Name of the maze
        name,
        
        // Collection of rooms (maps room name to room template)
        rooms,
        
        // Current room
        room: null,
        
        // Current score
        score: 0,
        
        // Player object
        player: null,
        
        // Maps room names to loaded rooms
        roomMap: {},

        // Set of collected keys (maps color to number)
        collectedKeys: {},
        
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
        
        // Gets the current room
        getRoom(): Room {
            return this.room;
        },
        
        // Sets the current room
        setRoom(room: Room) {
            this.room = room;
        },

        // Gets the room with a given name
        getRoomWithName(name: string): Room {
            if (name in this.roomMap) {
                return this.roomMap[name];
            } else {
                const room = Room.loadFromTemplate(this, this.rooms[name]);
                this.roomMap[name] = room;
                return room;
            }
        },

        // Loads the level for the first time (loading the starting room)
        load() {
            this.loadRoom({ name: startingRoom });
        },
        
        // Loads a room from a template
        // Starting position can optionally be provided
        loadRoom(roomLink: RoomLink) {
            // Unloads old room if needed
            this.room?.unload();
            
            // Sets up the current room
            this.room = this.getRoomWithName(roomLink.name);
            
            // if called with Level.load, the RoomLink object is not provided a position so we default to the room's starting position
            this.player = Player({
                level: this,
                position: roomLink.position ?? this.room.getStartPos(),
                room: this.room
            });

            this.game.setPlayer(this.player);
            
            this.player.draw();
            
            this.room.draw();
        },

        // Deletes the player's sprite
        deletePlayerSprite() {
            this.player.deleteSprite();
        },
        
        // Collects a key with the given color
        collectKey(color: Color) {
            if (color in this.collectedKeys) {
                this.collectedKeys[color]++;
            } else {
                this.collectedKeys[color] = 1;
            }
        }
    }
    
    object.setScore(0);
    
    return object;
};

// Creates a level from a template
Level.loadFromTemplate = (game: Game, template: LevelTemplate): Level => {
    return Level({ game, ...template });
} 

export default Level;