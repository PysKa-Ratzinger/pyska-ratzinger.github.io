'use strict';

export class utils {
        static httpGet(url, resolve, reject) {
                var xmlHttp = new XMLHttpRequest()
                xmlHttp.onreadystatechange = () => {
                        if (xmlHttp.readyState == 4) {
                                if (xmlHttp.status == 200) {
                                        resolve(xmlHttp.responseText)
                                } else {
                                        reject(xmlHttp.responseText);
                                }
                        }
                }
                xmlHttp.open("GET", url, true);
                xmlHttp.send(null);
        }

        static getWeightedRandom(weights) {
                if (weights.length === 0) {
                        return undefined;
                }
                let items = Array.from(weights.keys()).map((v) => [
                        weights[v], v
                ])
                let totalWeight = items.reduce((acc, curr) => {
                        return acc + curr[0];
                }, 0.0);
                if (totalWeight < 1.0) {
                        totalWeight = 1.0;
                }
                let weightedItems = items.map((t) => [
                        t[0] / totalWeight, t[1]
                ]);
                let rng = Math.random();
                while (rng > weightedItems[0][0]) {
                        rng -= weightedItems[0][0]
                        weightedItems.splice(0, 1)
                }
                return weightedItems[0][1]
        }

        static shuffle(arr) {
                let currentIndex = arr.length;

                // While there remain elements to shuffle...
                while (currentIndex != 0) {

                        // Pick a remaining element...
                        let randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex--;

                        // And swap it with the current element.
                        [arr[currentIndex], arr[randomIndex]] = [
                                arr[randomIndex], arr[currentIndex]];
                }
        }
}

export default utils;


