class Bingo {
    states;
    bingo;

    #setupField(field, txt, n) {
        field.innerText = txt;
        field.onclick = function () {
            if (window.bingo.states[n] === 0 && !window.bingo.bingo) {
                field.style.backgroundColor = "#8839ef";
                window.bingo.states[n] = 1;
                window.bingo.isBingo();
            }
            else if (window.bingo.states[n] === 1) {
                field.style.backgroundColor = "transparent";
                window.bingo.states[n] = 0;

                if (window.bingo.bingo) {
                    window.bingo.bingo = false;
                }
            }
        }
    }

    isBingo() {
        const possibleBingos = [
            [
                1, 1, 1,
                0, 0, 0,
                0, 0, 0
            ],
            [
                0, 0, 0,
                1, 1, 1,
                0, 0, 0
            ],
            [
                0, 0, 0,
                0, 0, 0,
                1, 1, 1
            ],
            [
                1, 0, 0,
                1, 0, 0,
                1, 0, 0
            ],
            [
                0, 1, 0,
                0, 1, 0,
                0, 1, 0
            ],
            [
                0, 0, 1,
                0, 0, 1,
                0, 0, 1
            ],
            [
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            ],
            [
                0, 0, 1,
                0, 1, 0,
                1, 0, 0
            ]
        ]

        this.bingo = possibleBingos.some((bingo) => {
            return bingo.every((v, i) => {
                return v === 0 || this.states[i] === 1;
            });
        });

        if (this.bingo) {
            let audio = new Audio("bingo.mp3");
            audio.play();
        }
    }

    constructor(db, target) {
        this.states = [];
        this.bingo = false;
        let i = 0;
        let arr = [];
        while (i < $(".bingo").length) {
            let rand = Math.floor(Math.random() * db[target].length);
            if (arr.indexOf(rand) === -1) {
                arr.push(rand);
                this.states.push(0);
                this.#setupField($(".bingo")[i], db[target][rand], i);
                i++;
            }
        }

        console.log(arr);
    }
}

$(document).ready(function () {
    const target = "baron";
    $.getJSON("db.json", function (db) {
        window.bingo = new Bingo(db, target);
    });
});
