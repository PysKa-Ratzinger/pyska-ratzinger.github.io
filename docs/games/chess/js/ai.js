'use strict';

import Board from "./board.js";
import utils from "./utils.js";

export class AIPlayer {
        constructor(color, max_depth = 2) {
                this.color = color
                this.max_depth = max_depth
        }

        getAllMoves(board) {
                let allPossibleMoves = []
                for (let i = 0; i < 64; i++) {
                        let piece = board.squares[i]
                        if (piece && piece.color == board.turn) {
                                board.getPossibleMoves(i).forEach((move) => {
                                        allPossibleMoves.push([i, move])
                                })
                        }
                }
                return allPossibleMoves
        }

        heuristic(board) {
                if (board.isGameOver()) {
                        let winner = board.winner()
                        if (winner == "stalemate") {
                                return 0.0
                        } else if (winner == "white") {
                                return Infinity
                        } else {
                                return -Infinity
                        }
                }

                let heuristic = 0.0
                board.squares.forEach((square) => {
                        let piece = square
                        if (!piece) {
                                return;
                        }
                        if (piece.color == "white") {
                                heuristic += piece.getValue()
                        } else {
                                heuristic -= piece.getValue()
                        }
                });

                if (board.checks.includes("white")) {
                        heuristic -= 1.0
                } else if (board.checks.includes("black")) {
                        heuristic += 1.0
                }

                let old_turn = board.turn
                board.turn = "white"
                let allWhiteMoves = this.getAllMoves(board)
                board.turn = "black"
                let allBlackMoves = this.getAllMoves(board)
                board.turn = old_turn

                heuristic += allWhiteMoves.length * 0.1
                heuristic -= allBlackMoves.length * 0.1

                return heuristic
        }

        getHeuristic(board, move) {
                let b2 = board.clone()
                b2.move(move[0], move[1])

                return this.heuristic(b2)
        }

        move(board) {
                let best_b = this.dfs(board, this.max_depth, "min")
                let move = best_b[1]
                board.move(move[0], move[1])
                console.log(`Current evaluation ${best_b[0]}`)
        }

        dfs(board, depth, type) {
                if (depth == 0 || board.isGameOver()) {
                        return [this.heuristic(board), undefined]
                }

                let allPossibleMoves = this.getAllMoves(board)
                if (allPossibleMoves.length == 0) {
                        return [0, undefined]
                }

                utils.shuffle(allPossibleMoves)

                let move = allPossibleMoves[0]
                let b2 = board.clone()
                if (!b2.move(move[0], move[1])) {
                        throw new Error("No way!")
                }
                let best_b2 = this.dfs(b2, depth - 1, type == "min" ? "max" : "min")
                let curr_heuristic = best_b2[0]

                for (let i = 1; i < allPossibleMoves.length; i++) {
                        let tentativeMove = allPossibleMoves[i]

                        b2 = board.clone()
                        if (!b2.move(tentativeMove[0], tentativeMove[1])) {
                                throw new Error("WHAT?!")
                        }
                        best_b2 = this.dfs(b2, depth - 1, type == "min" ? "max" : "min")
                        let tentativeHeuristic = best_b2[0]

                        if ((type == "min" && tentativeHeuristic < curr_heuristic) ||
                                (type == "max" && tentativeHeuristic > curr_heuristic)) {
                                move = tentativeMove
                                curr_heuristic = tentativeHeuristic
                        }
                }

                return [curr_heuristic, move]
        }
};

export default AIPlayer;

