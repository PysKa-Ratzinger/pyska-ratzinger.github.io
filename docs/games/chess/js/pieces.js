'use strict';

import Vec from "./vec.js";

export class Piece {
        constructor(color, pieceNotation, has_moved = false, value = 0) {
                if (color !== "white" && color !== "black") {
                        throw new Error(`Invalid color ${color}`);
                }
                this.color = color;
                this.notation = pieceNotation
                this.svgPath = this.getSVGPath()
                this.has_moved = has_moved
                this.value = value
        }

        clone() {
                return new Piece(this.color, this.notation, this.has_moved, this.value)
        }

        getSVGPath() {
                let prefix = (this.color == "white" ? "w" : "b");
                return prefix + this.notation + ".svg"
        }

        canMove(start, delta, board) {
                return false
        }

        getPossibleMoves(start, board) {
                return []
        }

        getValue() {
                return this.value
        }
};

export class Pawn extends Piece {
        constructor(color) {
                super(color, "P", false, 1);
        }

        clone() {
                return new Pawn(this.color)
        }

        canMove(start, delta, board) {
                let inverted = this.color == "black"
                if (inverted) {
                        start = (new Vec(7, 7)).sub(start)
                        delta = (new Vec(0, 0)).sub(delta)
                }
                if (start.x == 7) {
                        return false;
                }
                if (delta.y == 0) {
                        if (board.getPiece(start.x + 1, start.y, inverted)) {
                                return false;
                        }
                        if (!delta.x && delta.x !== 0) {
                                throw new Error("WOW")
                        }
                        if (delta.x == 1) {
                                return true
                        } else if (delta.x == 2) {
                                if (start.x != 1) {
                                        return false
                                }
                                if (board.getPiece(start.x + delta.x, start.y, inverted)) {
                                        return false;
                                }
                                return true;
                        } else {
                                return false
                        }
                } else if (delta.y == 1 || delta.y == -1) {
                        if (delta.x != 1) {
                                return false
                        }
                        let piece = board.getPiece(start.x + delta.x, start.y + delta.y, inverted)
                        if (piece) {
                                return piece.color != this.color
                        }

                        // Check if en-passant
                        if (start.x != 4) {
                                return false;
                        }

                        if (board.move_history.length == 0) {
                                return false;
                        }

                        let lastMove = board.move_history[board.move_history.length - 1]

                        if (lastMove[0] != 6 || lastMove[1] != start.y + delta.y ||
                                lastMove[2] != 4 || lastMove[3] != start.y + delta.y) {
                                return false;
                        }

                        piece = board.getPiece(4, start.y + delta.y, inverted)
                        if (!piece) {
                                return false;
                        }

                        if (!(piece instanceof Pawn)) {
                                return false
                        }

                        return piece.color != this.color;
                }
                return false
        }

        getPossibleMoves(start, board) {
                let maybePossible = []
                if (this.color == "white") {
                        maybePossible = [
                                new Vec(1, 0),
                                new Vec(2, 0),
                                new Vec(1, -1),
                                new Vec(1, 1),
                        ]
                } else {
                        maybePossible = [
                                new Vec(-1, 0),
                                new Vec(-2, 0),
                                new Vec(-1, 1),
                                new Vec(-1, -1),
                        ]
                }

                let result = []
                maybePossible.forEach((delta) => {
                        let target = start.add(delta)
                        if (board.isInBounds(target) && board.isMoveAllowed(board.getIdx(start), board.getIdx(target))) {
                                result.push(target)
                        }
                });

                return result
        }

};

export class Rook extends Piece {
        constructor(color) {
                super(color, "R", false, 5);
        }

        clone() {
                return new Rook(this.color)
        }

        canMove(start, delta, board) {
                if (delta.x != 0 && delta.y != 0) {
                        return false
                }
                let move_dir = new Vec(
                        delta.x > 0 ? 1 : delta.x < 0 ? -1 : 0,
                        delta.y > 0 ? 1 : delta.y < 0 ? -1 : 0,
                )
                let move_total = move_dir
                while (move_total.x != delta.x || move_total.y != delta.y) {
                        let pos = start.add(move_total)
                        move_total = move_total.add(move_dir)
                        if (board.getPiece(pos.x, pos.y)) {
                                return false
                        }
                }

                let pos = start.add(move_total)

                let piece = board.getPiece(pos.x, pos.y)
                if (!piece) {
                        return true;
                }

                return piece.color != this.color
        }

        getPossibleMoves(start, board) {
                let directions = [
                        new Vec(0, 1),
                        new Vec(0, -1),
                        new Vec(1, 0),
                        new Vec(-1, 0),
                ]

                let result = []
                directions.forEach((dir) => {
                        for (let mult = 1; mult < 8; mult++) {
                                let delta = dir.mult(mult)
                                let target = start.add(delta)
                                if (board.isInBounds(target) && board.isMoveAllowed(board.getIdx(start), board.getIdx(target))) {
                                        result.push(target)
                                } else {
                                        break;
                                }
                        }
                });

                return result
        }

};

export class Bishop extends Piece {
        constructor(color) {
                super(color, "B", false, 3);
        }

        clone() {
                return new Bishop(this.color)
        }

        canMove(start, delta, board) {
                if (Math.abs(delta.x) != Math.abs(delta.y)) {
                        return false
                }
                let move_dir = new Vec(
                        delta.x > 0 ? 1 : -1,
                        delta.y > 0 ? 1 : -1
                )
                let move_total = move_dir
                while (move_total.x != delta.x || move_total.y != delta.y) {
                        let pos = start.add(move_total)
                        if (board.getPiece(pos.x, pos.y)) {
                                return false
                        }
                        move_total = move_total.add(move_dir)
                }

                let pos = start.add(move_total)
                let piece = board.getPiece(pos.x, pos.y)
                if (!piece) {
                        return true;
                }

                return piece.color != this.color
        }

        getPossibleMoves(start, board) {
                let directions = [
                        new Vec(1, 1),
                        new Vec(1, -1),
                        new Vec(-1, 1),
                        new Vec(-1, -1),
                ]

                let result = []
                directions.forEach((dir) => {
                        for (let mult = 1; mult < 8; mult++) {
                                let delta = dir.mult(mult)
                                let target = start.add(delta)
                                if (board.isInBounds(target) && board.isMoveAllowed(board.getIdx(start), board.getIdx(target))) {
                                        result.push(target)
                                } else {
                                        break;
                                }
                        }
                });

                return result
        }

};

export class Queen extends Piece {
        constructor(color) {
                super(color, "Q", false, 9);
                this.rook = new Rook(color)
                this.bishop = new Bishop(color)
        }

        clone() {
                return new Queen(this.color)
        }

        canMove(start, delta, board) {
                return this.rook.canMove(start, delta, board) ||
                        this.bishop.canMove(start, delta, board);
        }

        getPossibleMoves(start, board) {
                let result = []
                result.push.apply(result, this.rook.getPossibleMoves(start, board))
                result.push.apply(result, this.bishop.getPossibleMoves(start, board))
                return result
        }
};

export class Knight extends Piece {
        constructor(color) {
                super(color, "N", false, 3);
        }

        clone() {
                return new Knight(this.color)
        }

        canMove(start, delta, board) {
                let mv = [
                        Math.abs(delta.x),
                        Math.abs(delta.y)
                ]
                mv.sort()
                if (mv[0] != 1 || mv[1] != 2) {
                        return false
                }

                let target = start.add(delta)
                let piece = board.getPiece(target.x, target.y)
                if (!piece) {
                        return true;
                }
                return piece.color != this.color
        }

        getPossibleMoves(start, board) {
                let maybePossible = [
                        new Vec(1, 2),
                        new Vec(2, 1),
                        new Vec(1, -2),
                        new Vec(2, -1),
                        new Vec(-1, -2),
                        new Vec(-2, -1),
                        new Vec(-1, 2),
                        new Vec(-2, 1),
                ]

                let result = []
                maybePossible.forEach((delta) => {
                        let target = start.add(delta)
                        if (board.isInBounds(target) && board.isMoveAllowed(board.getIdx(start), board.getIdx(target))) {
                                result.push(target)
                        }
                });

                return result
        }
};

export class King extends Piece {
        constructor(color) {
                super(color, "K", false, 100);
        }

        clone() {
                return new King(this.color)
        }

        canMove(start, delta, board) {
                if ((delta.y == 2 || delta.y == -2) && delta.x == 0) {
                        if (this.has_moved) {
                                return false;
                        }

                        if (board.isSquareAttacked(start, this.color)) {
                                return false;
                        }

                        // Check castling
                        let dir = new Vec(0, delta.y > 0 ? 1 : -1)

                        // Check empty squares until rook
                        let mult = 1
                        let distToRook = -1
                        while (true) {
                                let target = start.add(dir.mult(mult))
                                if (!board.isInBounds(target)) {
                                        return false
                                }
                                let piece = board.getPiece(target.x, target.y)

                                if (piece) {
                                        if (piece.color == this.color && (piece instanceof Rook)) {
                                                if (piece.has_moved) {
                                                        return false
                                                }
                                                distToRook = mult
                                                break
                                        }
                                        return false
                                }

                                if (mult <= 2) {
                                        if (board.isSquareAttacked(target, this.color)) {
                                                return false
                                        }
                                }

                                mult++;
                        }

                        if (distToRook <= 2) {
                                return false
                        }

                        return true
                }

                if (Math.abs(delta.x) > 1 || Math.abs(delta.y) > 1) {
                        return false;
                }
                let target = start.add(delta)
                let piece = board.getPiece(target.x, target.y)
                if (!piece) {
                        return true;
                }
                return piece.color != this.color
        }

        getPossibleMoves(start, board) {
                let maybePossible = [
                        new Vec(0, 1),
                        new Vec(0, -1),
                        new Vec(1, -1),
                        new Vec(1, 0),
                        new Vec(1, 1),
                        new Vec(-1, -1),
                        new Vec(-1, 0),
                        new Vec(-1, 1),
                ]

                if (!this.has_moved) {
                        maybePossible.push(new Vec(0, 2))
                        maybePossible.push(new Vec(0, -2))
                }

                let result = []
                maybePossible.forEach((delta) => {
                        let target = start.add(delta)
                        if (board.isInBounds(target) && board.isMoveAllowed(board.getIdx(start), board.getIdx(target))) {
                                result.push(target)
                        }
                });

                return result
        }
};

