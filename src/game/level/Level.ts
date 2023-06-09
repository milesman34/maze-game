import * as $ from "jquery"
import Game from "../Game"
import Player from "../Player"
import { Room } from "../rooms/Room"
import { RoomCollection } from "../rooms/RoomTemplate"
import { LevelTemplate } from "./LevelTemplate"
import { Color } from "../../utils/types"
import Tile from "../tiles/Tile"
import { RoomLink } from "../rooms/RoomLink"
import { Point } from "../../utils/Point"
import { GameState, flipDirection } from "../../utils/enums"

// This object represents a level in the game
// Each level has a series of rooms
type Level = {
    game: Game,
    startingRoom: string,
    name: string,
    rooms: RoomCollection,
    room: Room
    score: number,
    steps: number,
    player: Player,
    roomMap: Record<string, Room>,
    roomLinkMap: Record<string, Array<RoomLink>>,
    collectedKeys: Record<Color, number>,
    getScore: () => number,
    setScore: (score: number) => void,
    addScore: (score: number) => void,
    getSteps: () => number,
    setSteps: (steps: number) => void,
    incrementSteps: () => void,
    getPlayer: () => Player,
    getRoom: () => Room,
    setRoom: (room: Room) => void,
    getRoomWithName: (name: string) => Room,
    load: () => void,
    unloadRoom: () => void,
    loadRoom: (name: string, position: Point) => void,
    loadRoomFromLink: (roomLink: RoomLink) => void,
    deletePlayerSprite: () => void,
    collectKey: (color: Color) => void,
    getCollectedKeys: () => Record<Color, number>,
    endLevel: () => void
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

        // Number of steps made by the player
        steps: 0,
        
        // Player object
        player: null,
        
        // Maps room names to loaded rooms
        roomMap: {},

        // Maps room names to a list of room links
        roomLinkMap: {},

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

        // Gets the current steps
        getSteps(): number {
            return this.steps;
        },

        // Sets the current number of steps
        setSteps(steps: number) {
            this.steps = steps;
            $("#steps-container").text(`Steps: ${this.steps}`);
        },

        // Increments the number of steps
        incrementSteps() {
            this.setSteps(this.steps + 1);
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
            let room: Room;

            if (name in this.roomMap) {
                room = this.roomMap[name];
            } else {
                room = Room.loadFromTemplate(this, this.rooms[name]);
                this.roomMap[name] = room;
            }

            // Update the values of any object which may need an update
            room.iterate((object: Tile, x: number, y: number) => {
                object?.update();
            });

            return room;
        },

        // Loads the level for the first time (loading the starting room)
        load() {
            this.loadRoom(startingRoom);
        },

        // Unloads the current room
        unloadRoom() {
            this.room?.unload();
        },
        
        // Loads a room from a template
        // Starting position can optionally be provided
        loadRoom(name: string, position: Point = null) {
            // Unloads old room if needed
            this.room?.unload();
            
            // Sets up the current room
            this.room = this.getRoomWithName(name);

            // Sets up room links for this room
            let links = this.roomLinkMap[name];

            if (links.length > 0) {
                links.forEach((link: RoomLink) => {
                    this.room.setRoomLinkSource(link);
                });
            }
            
            // if called with Level.load, the RoomLink object is not provided a position so we default to the room's starting position
            this.player = Player({
                level: this,
                position: position ?? this.room.getStartPos(),
                room: this.room
            });

            this.game.setPlayer(this.player);
            
            this.room.draw();
            
            this.player.draw();
        },

        // Loads a room using a RoomLink
        loadRoomFromLink(roomLink: RoomLink) {
            this.loadRoom(roomLink.destination.name, roomLink.destination.position);
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

            this.room.iterate((object: Tile, x: number, y: number) => {
                object?.useKey(color);
            });
        },

        // Gets the collected keys
        getCollectedKeys() {
            return this.collectedKeys;
        },

        // Ends the level
        endLevel() {
            this.unloadRoom();

            // Tell the game to update the level select screen with the coins and steps from that level
            this.game.setCoins(this.score);
            this.game.setSteps(this.steps);

            this.game.setState(GameState.LevelEnd);
        }
    }
    
    object.setScore(0);
    object.setSteps(0);

    // First set up the empty arrays for the roomLinkMap
    Object.keys(rooms).forEach(key => {
        object.roomLinkMap[key] = [];
    });

    // Then, set up all room links in advance
    Object.entries(rooms).forEach(entry => {
        let links = entry[1].roomLinks;

        // forEach does not work with an empty list of room links
        if (links.length === 0)
            return;

        links.forEach(link => {
            // First set up the initial link to the next room
            let startLink = link;

            object.roomLinkMap[entry[0]].push(startLink);

            // Now set up the link from the next room back to this one
            let endLink = RoomLink.createForTemplate(
                startLink.destination.position,
                {
                    name: entry[0],
                    position: startLink.source.position
                },
                flipDirection(startLink.direction)
            )

            object.roomLinkMap[startLink.destination.name].push(endLink);
        });
    });
    
    return object;
};

// Creates a level from a template
Level.loadFromTemplate = (game: Game, template: LevelTemplate): Level => {
    return Level({ game, ...template });
} 

export default Level;