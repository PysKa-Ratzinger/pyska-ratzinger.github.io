'use strict';

import utils from './utils.js';
import Board from './board.js';
import AIPlayer from './ai.js';
import Vec from './vec.js';

export class Game {
        constructor() {
                console.log("Game constructed")
                this.templates = {}
                this.templatesToLoad = {
                        "game_board": "./views/game_board.html"
                }
                this.partialsToLoad = {
                        "square": "./partials/square.html",
                        "piece": "./partials/piece.html",
                        "board": "./partials/board.html",
                }

                this.available_themes = [
                        "alpha",
                        "anarcandy",
                        "caliente",
                        "california",
                        "cardinal",
                        "cburnett",
                        "celtic",
                        "chess7",
                        "chessnut",
                        "companion",
                        "cooke",
                        "disguised",
                        "dubrovny",
                        "fantasy",
                        "fresca",
                        "gioco",
                        "governor",
                        "horsey",
                        "icpieces",
                        "kiwen-suwi",
                        "kosal",
                        "leipzig",
                        "letter",
                        "maestro",
                        "merida",
                        "monarchy",
                        "mono",
                        "mpchess",
                        "pirouetti",
                        "pixel",
                        "reillycraig",
                        "riohacha",
                        "shapes",
                        "spatial",
                        "staunty",
                        "tatiana",
                ]

                this.theme = "fresca"

                this.board = new Board()

                this.startPositionId = undefined
                this.draggedElement = undefined
                this.clickedPositionId = undefined
                this.clickedPiece = undefined
                this.on_redraw = undefined

                this.ai_player = new AIPlayer("black", 2)
        }

        loadTemplates() {
                let allKeys = Object.keys(this.templatesToLoad)

                return Promise.all(allKeys.map((key) => {
                        return new Promise((resolve, reject) => {
                                let url = this.templatesToLoad[key];
                                utils.httpGet(url,
                                        ((template) => {
                                                this.templates[key] =
                                                        Handlebars.compile(template);
                                                resolve();
                                        }).bind(this),
                                        reject);
                        });
                }));
        }

        loadPartials() {
                let allKeys = Object.keys(this.partialsToLoad);

                return Promise.all(allKeys.map((key) => {
                        return new Promise((resolve, reject) => {
                                let url = this.partialsToLoad[key];
                                utils.httpGet(url,
                                        ((result) => {
                                                Handlebars.registerPartial(key, result);
                                                resolve();
                                        }).bind(this),
                                        reject);
                        });
                }));
        }

        onRedraw(cb) {
                this.on_redraw = () => {
                        cb()
                        this.resetHighlights()
                }
        }

        draw() {
                let divBoard = document.createElement("div")

                let squares = Array(64).fill(undefined)
                for (let row = 0; row < 8; row++) {
                        for (let col = 0; col < 8; col++) {
                                let idx = row * 8 + col
                                let color = ((row + col) % 2 == 0) ? "color-white" : "color-black"
                                let piece = undefined
                                if (this.board.squares[idx]) {
                                        piece = this.board.squares[idx].clone()
                                }
                                squares[idx] = {
                                        "square-id": idx,
                                        "color": color,
                                        "piece": piece
                                }
                        }
                }

                let result = this.templates["game_board"]({ "game": this, "squares": squares })
                divBoard.innerHTML = result
                return divBoard
        }

        async init() {
                console.log("Init called")
                await this.loadTemplates()
                await this.loadPartials()
                this.board.initializeStartingPosition()
        }

        bindCallbacks() {
                const themeSelector = document.getElementById("theme-select")
                themeSelector.addEventListener('change', () => {
                        console.log(themeSelector.value)
                        this.theme = themeSelector.value
                        this.on_redraw()
                })

                const resetButton = document.getElementById("resetButton")
                resetButton.addEventListener('click', () => {
                        this.board.initializeStartingPosition()
                        this.on_redraw()
                })

                const allPieces = document.querySelectorAll(".gameboard img.square")
                allPieces.forEach(piece => {
                        piece.addEventListener('dragstart', (e) => { this.onDragStart(e) })
                        piece.addEventListener('drop', (e) => { this.onDragDropPiece(e) })
                        piece.addEventListener('click', (e) => { this.onClickPiece(e) })
                })

                const allSquares = document.querySelectorAll(".gameboard div.square")
                allSquares.forEach(square => {
                        square.addEventListener('dragover', (e) => { this.onDragOver(e) })
                        square.addEventListener('drop', (e) => { this.onDragDropSquare(e) })
                        square.addEventListener('click', (e) => { this.onClickSquare(e) })
                })
        }

        move(startPos, endPos) {
                return this.board.move(startPos, endPos);
        }

        highlightPossibleMoves() {
                const allSquares = document.querySelectorAll(".gameboard div.square")
                const posId = this.startPositionId !== undefined ? this.startPositionId : this.clickedPositionId
                if (posId === undefined) {
                        return
                }
                const allPossibleMoves = this.board.getPossibleMoves(posId)
                allSquares.forEach(square => {
                        let square_id = square.getAttribute("square-id")
                        let isContained = false
                        for (let i = 0; i < allPossibleMoves.length; i++) {
                                if (allPossibleMoves[i] == square_id) {
                                        isContained = true
                                        break
                                }
                        }
                        if (isContained) {
                                square.classList.add("highlighted")
                        }
                })
        }

        resetHighlights() {
                const allSquares = document.querySelectorAll(".gameboard div.square")
                let lastMove = undefined
                if (this.board.move_history.length > 0) {
                        lastMove = this.board.move_history[this.board.move_history.length - 1]
                        lastMove = [
                                this.board.getIdx(new Vec(lastMove[0], lastMove[1])),
                                this.board.getIdx(new Vec(lastMove[2], lastMove[3]))
                        ]
                }
                allSquares.forEach(square => {
                        square.classList.remove("highlighted")
                        if (lastMove) {
                                let square_id = square.getAttribute("square-id")
                                if (square_id == lastMove[0] || square_id == lastMove[1]) {
                                        square.classList.add("previousMove")
                                }
                        }
                })
        }

        checkRedraw() {
                if (this.board.mustRedraw) {
                        if (this.on_redraw) {
                                this.on_redraw()
                        }
                        this.board.mustRedraw = false
                }
        }

        onDragStart(e) {
                this.clickedPositionId = undefined
                this.clickedPiece = undefined
                this.startPositionId = e.target.parentNode.getAttribute("square-id")
                this.draggedElement = e.target

                this.resetHighlights()
                this.highlightPossibleMoves()
        }

        onDragOver(e) {
                e.preventDefault()
        }

        endOfMove() {
                this.resetHighlights()
                this.checkRedraw()
                if (!this.board.isGameOver() && this.board.turn == this.ai_player.color) {

                        setTimeout(() => {
                                this.ai_player.move(this.board)
                                this.on_redraw()
                                this.board.mustRedraw = false
                        }, 100)
                }
        }

        onDragDropPiece(e) {
                e.stopPropagation()
                if (this.board.turn == this.ai_player.color) {
                        return;
                }
                if (this.startPositionId === undefined) {
                        return;
                }
                let endPositionId = e.target.parentNode.getAttribute("square-id")
                if (this.move(this.startPositionId, endPositionId)) {
                        e.target.parentNode.append(this.draggedElement)
                        e.target.remove()
                }
                this.startPositionId = undefined
                this.draggedElement = undefined
                this.endOfMove()
        }

        onDragDropSquare(e) {
                e.stopPropagation()
                if (this.board.turn == this.ai_player.color) {
                        return;
                }
                if (this.startPositionId === undefined) {
                        return;
                }
                let endPositionId = e.target.getAttribute("square-id")
                if (this.move(this.startPositionId, endPositionId)) {
                        e.target.append(this.draggedElement)
                }
                this.startPositionId = undefined
                this.draggedElement = undefined
                this.endOfMove()
        }

        onClickPiece(e) {
                e.stopPropagation()
                console.log("Clicked Piece")
                this.startPositionId = undefined
                this.draggedElement = undefined

                let moved = false

                if (!this.clickedPiece) {
                        this.clickedPositionId = e.target.parentNode.getAttribute("square-id")
                        this.clickedPiece = e.target
                } else {
                        let endPositionId = e.target.parentNode.getAttribute("square-id")
                        if (endPositionId != this.clickedPositionId) {
                                if (this.move(this.clickedPositionId, endPositionId)) {
                                        e.target.parentNode.append(this.clickedPiece)
                                        e.target.remove()
                                        moved = true
                                }
                                this.clickedPositionId = endPositionId
                                this.clickedPiece = e.target
                        } else {
                                this.clickedPositionId = undefined
                                this.clickedPiece = undefined
                        }
                }

                this.resetHighlights()
                this.highlightPossibleMoves()
                if (moved) {
                        this.endOfMove()
                }
        }

        onClickSquare(e) {
                e.stopPropagation()
                this.resetHighlights()
                console.log("Clicked Square")
                if (!this.clickedPiece) {
                        return;
                }

                let endPositionId = e.target.getAttribute("square-id")
                if (this.move(this.clickedPositionId, endPositionId)) {
                        e.target.append(this.clickedPiece)
                }

                this.clickedPositionId = undefined
                this.clickedPiece = undefined
                this.resetHighlights()
                this.endOfMove()
        }
}

export default Game;

