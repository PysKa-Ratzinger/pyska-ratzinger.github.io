'use strict';

import * as Pieces from './pieces.js';
import Vec from './vec.js';

export class Board {
        constructor(turn, squares, move_history = []) {
                this.turn = turn ? turn : "white"
                this.squares = Array(64).fill(undefined)
                this.check = undefined
                this.move_history = JSON.parse(JSON.stringify(move_history))
                this.mustRedraw = false
                this.possibleMoves = new Set()

                for (let row = 0; row < 8; row++) {
                        for (let col = 0; col < 8; col++) {
                                let idx = row * 8 + col
                                let piece = undefined
                                if (squares && squares[idx]) {
                                        piece = squares[idx].clone()
                                }
                                this.squares[idx] = piece
                        }
                }

                this.validate()
        }

        clone() {
                return new Board(this.turn, this.squares, this.move_history)
        }

        isInBounds(vec) {
                return vec.x >= 0 && vec.x <= 7 &&
                        vec.y >= 0 && vec.y <= 7;
        }

        isMovingPossible() {
                return this.possibleMoves.has(this.turn)
        }

        isGameOver() {
                return !this.isMovingPossible()
        }

        winner() {
                if (!this.isMovingPossible()) {
                        if (this.checks.includes(this.turn)) {
                                return this.turn == "black" ? "white" : "black"
                        }
                        return "stalemate"
                }
        }

        printState() {
                if (this.isMovingPossible()) {
                        console.log(`It is ${this.turn} turn`)
                        if (this.checks.length > 0) {
                                console.log(`${this.checks[0]} is in check`)
                        }
                        return
                }

                if (this.checks.includes(this.turn)) {
                        console.log(`${this.turn} has lost`)
                        return
                }

                console.log(`The game ends in stalemate`)
        }

        checkIfMovingPossible() {
                this.possibleMoves = new Set()

                for (let row = 0; row < 8; row++) {
                        for (let col = 0; col < 8; col++) {
                                let piece = this.getPiece(row, col)
                                if (!piece) {
                                        continue
                                }

                                if (this.getPossibleMoves(this.getIdx(new Vec(row, col))).length > 0) {
                                        this.possibleMoves.add(piece.color)
                                }
                        }
                }
        }

        isSquareAttacked(target, color) {
                for (let row = 0; row < 8; row++) {
                        for (let col = 0; col < 8; col++) {
                                let pos = new Vec(row, col)
                                if (pos.x == target.x && pos.y == target.y) {
                                        continue
                                }

                                let piece = this.getPiece(pos.x, pos.y)
                                if (!piece) {
                                        continue
                                }

                                let delta = target.sub(pos)
                                if (piece.color == color) {
                                        continue;
                                }

                                let old_has_move = piece.has_moved
                                piece.has_moved = true
                                if (piece.canMove(pos, delta, this)) {
                                        piece.has_moved = old_has_move
                                        return true
                                }
                                piece.has_moved = old_has_move
                        }
                }

                return false
        }

        validate() {
                let kings = []

                this.checks = []

                for (let row = 0; row < 8; row++) {
                        for (let col = 0; col < 8; col++) {
                                let piece = this.getPiece(row, col)
                                if (!piece) {
                                        continue
                                }

                                if (piece instanceof Pieces.King) {
                                        kings.push([piece, new Vec(row, col)])
                                        continue
                                }
                        }
                }

                kings.forEach((elem) => {
                        let king = elem[0]
                        let start = elem[1]

                        if (this.isSquareAttacked(start, king.color)) {
                                this.checks.push(king.color)
                        }

                });
        }

        clearBoard() {
                for (let i = 0; i < this.squares.length; i++) {
                        this.squares[i] = undefined
                }
        }

        loadBoardState(configuration) {
                for (let row = 0; row < 8; row++) {
                        for (let col = 0; col < 8; col++) {
                                let c = configuration[row][col]
                                if (c == ' ') {
                                        continue;
                                }
                                let c2 = c.toLowerCase()
                                let color = c == c2 ? "white" : "black"
                                let TPiece = {
                                        "p": Pieces.Pawn,
                                        "r": Pieces.Rook,
                                        "n": Pieces.Knight,
                                        "b": Pieces.Bishop,
                                        "q": Pieces.Queen,
                                        "k": Pieces.King,
                                }[c2]

                                if (TPiece === undefined) {
                                        throw new Error("Invalid initial configuration.")
                                }

                                this.squares[this.getIdx(new Vec(7 - row, col))] = new TPiece(color)
                        }
                }
        }

        initializeStartingPosition() {
                this.clearBoard()

                let initialConfiguration = [
                        'RNBQKBNR',
                        'PPPPPPPP',
                        '        ',
                        '        ',
                        '        ',
                        '        ',
                        'pppppppp',
                        'rnbqkbnr',
                ]

                this.loadBoardState(initialConfiguration)
                this.turn = "white"
        }

        printBoard(tabs = 0) {
                let result = ""
                for (let row = 0; row < 8; row++) {
                        let line = ""
                        for (let i = 0; i < tabs; i++) {
                                line += "    "
                        }
                        for (let col = 0; col < 8; col++) {
                                let piece = this.getPiece(7 - row, col)
                                if (!piece) {
                                        line += " "
                                } else {
                                        let n = piece.notation
                                        if (piece.color == "white") {
                                                n = n.toLowerCase()
                                        }
                                        line += n
                                }
                        }
                        result += line + "\n"
                }
                console.log(result)
        }

        getIdx(pos) {
                return (7 - pos.x) * 8 + pos.y
        }

        getRowCol(idx) {
                let row = Math.floor(idx / 8)
                let col = idx % 8
                return new Vec(7 - row, col)
        }

        getPiece(row, col, inverted = false) {
                if (inverted) {
                        col = 7 - col
                        row = 7 - row
                }
                let idx = this.getIdx(new Vec(row, col))
                return this.squares[idx]
        }

        getFirst(start, dir) {
                let dist = 0
                let pos = start
                while (this.isInBounds(pos)) {
                        let piece = this.getPiece(pos.x, pos.y)
                        if (piece) {
                                return [piece, dist]
                        }
                        dist++
                        pos = start.add(dir.mult(dist))
                }
                return [undefined, undefined]
        }

        forceMove(startPos, endPos) {
                let start = this.getRowCol(startPos)
                let end = this.getRowCol(endPos)
                if (this.squares[startPos] instanceof Pieces.Pawn) {
                        // check en-passant
                        if (!this.squares[endPos]) {
                                let delta = end.sub(start)
                                let piece = this.getPiece(start.x, start.y)
                                if (delta.y != 0) {
                                        let enemyPawnPos = new Vec(start.x, end.y)
                                        let idx = this.getIdx(enemyPawnPos)
                                        this.squares[idx] = undefined
                                        this.mustRedraw = true
                                }
                        }

                        // check promotion
                        if (end.x == 7 || end.x == 0) {
                                this.squares[startPos] =
                                        new Pieces.Queen(this.squares[startPos].color)
                        }
                }
                if (this.squares[startPos] instanceof Pieces.King) {
                        let delta = end.sub(start)
                        // Find rook to castle with and move it as well
                        if (delta.y == 2 || delta.y == -2) {
                                let dir = new Vec(0, delta.y > 0 ? 1 : -1)
                                let res = this.getFirst(start.add(dir), dir)
                                if (res[0] !== undefined) {
                                        let dist = res[1]
                                        let rookIdx = this.getIdx(start.add(dir.mult(dist + 1)))
                                        let castledIdx = this.getIdx(start.add(dir))
                                        this.squares[castledIdx] = this.squares[rookIdx]
                                        this.squares[rookIdx] = undefined
                                        this.mustRedraw = true
                                }
                        }
                }
                this.squares[startPos].has_moved = true
                this.squares[endPos] = this.squares[startPos]
                this.squares[startPos] = undefined
                this.turn = (this.turn == "black" ? "white" : "black")
                this.move_history.push([start.x, start.y, end.x, end.y])
                this.validate()
        }

        getPossibleMoves(startPos) {
                let piece = this.squares[startPos]
                if (!piece) {
                        return []
                }

                let start = this.getRowCol(startPos)

                let result = piece.getPossibleMoves(start, this).map((pos) => {
                        return this.getIdx(pos)
                })

                return result
        }

        isMoveAllowed(startPos, endPos) {
                if (startPos == endPos) {
                        return false;
                }

                let piece = this.squares[startPos]
                if (!piece) {
                        return false;
                }

                if (piece.color != this.turn) {
                        return false;
                }

                let start = this.getRowCol(startPos)
                let end = this.getRowCol(endPos)

                let delta = end.sub(start)

                if (!piece.canMove(start, delta, this)) {
                        return false;
                }

                let newBoard = this.clone()
                newBoard.forceMove(startPos, endPos)

                // We can't move into check
                if (newBoard.checks.includes(this.turn)) {
                        return false
                }

                return true
        }

        move(startPos, endPos) {
                if (this.isMoveAllowed(startPos, endPos)) {
                        if (!this.squares[startPos]) {
                                throw new Error("Fatal error. Tried to move from a square without pieces.")
                        }
                        this.forceMove(startPos, endPos)
                        this.checkIfMovingPossible()
                        return true
                }
                return false
        }
};

export default Board;

