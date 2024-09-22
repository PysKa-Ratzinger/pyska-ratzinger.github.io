'use strict';

import Game from './game.js';

let g_game_state = undefined;
let g_root = document.getElementById("app")

function draw() {
        let board = g_game_state.draw()

        g_root.innerHTML = ""
        g_root.append(board)

        g_game_state.bindCallbacks()
}

function start_game() {
        g_game_state = new Game()
        g_game_state.init().then(() => {
                draw();
        });

        g_game_state.onRedraw(() => {
                draw()
        });
}

function main() {
        Handlebars.registerHelper("when", (operand_1, operator, operand_2, options) => {
                let operators = {
                        'eq': (l, r) => l == r,
                        'noteq': (l, r) => l != r,
                        'gt': (l, r) => (+l) > (+r),
                        'gteq': (l, r) => ((+l) > (+r)) || (l == r),
                        'lt': (l, r) => (+l) < (+r),
                        'lteq': (l, r) => ((+l) < (+r)) || (l == r),
                        'or': (l, r) => l || r,
                        'and': (l, r) => l && r,
                        '%': (l, r) => (l % r) === 0
                }
                let result = operators[operator](operand_1, operand_2);
                return !!result;
        });
        Handlebars.registerHelper("json", (ctx) => {
                return JSON.stringify(ctx);
        });

        start_game();
}

main();

