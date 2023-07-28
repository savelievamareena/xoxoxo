import React from "react";
import './App.css';

function App() {

    const combinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    const [gameStat, setGameStat] = React.useState({
        activeUser: 1,
        isStrike: false,
        store: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    })

    function handleButtonClick() {
        setGameStat({
            activeUser: 1,
            isStrike: false,
            store: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        })
    }

    function checkWin() {
        for(let i= 0; i < combinations.length; i++) {
            let combination = combinations[i];
            if(gameStat.store[combination[0]] !== 0
                && gameStat.store[combination[0]] === gameStat.store[combination[1]]
                && gameStat.store[combination[1]] === gameStat.store[combination[2]]
            ) {
                setGameStat(prevState => ({
                    ...prevState,
                    isStrike: true
                }))
                break;
            }
        }
    }

    function checkIfFilled(squareIndex) {
        return gameStat.store[squareIndex] !== 0;
    }

    function handleMove(cellIndex, e) {
        if(gameStat.isStrike) {
            return;
        }

        if(checkIfFilled(cellIndex)) {
            return;
        }

        let gameStatActiveUserNewValue = 1;
        let cellNewClassName = "pink";
        if(gameStat.activeUser === 1) {
            gameStatActiveUserNewValue = 2;
            cellNewClassName = "grey";
        }

        setGameStat(prevState => {
            prevState.store[cellIndex] = gameStat.activeUser;
            return {
            ...prevState,
                activeUser: gameStatActiveUserNewValue,
                store: [...prevState.store]
            }
        })
        e.currentTarget.classList.add(cellNewClassName);
    }

    React.useEffect(checkWin, [gameStat.store])

    return (
        <div className="App">
            <div className="title-field">
                <h1 id="title">{gameStat.isStrike ? "WIN!!!" : "Let's go"}</h1>
            </div>
            <div className="game-field">
                <div className="row">
                    <div className="square" onClick={handleMove.bind(undefined, 0)}></div>
                    <div className="square" onClick={handleMove.bind(undefined, 1)}></div>
                    <div className="square" onClick={handleMove.bind(undefined, 2)}></div>
                </div>
                <div className="row">
                    <div className="square" onClick={handleMove.bind(undefined, 3)}></div>
                    <div className="square" onClick={handleMove.bind(undefined, 4)}></div>
                    <div className="square" onClick={handleMove.bind(undefined, 5)}></div>
                </div>
                <div className="row">
                    <div className="square" onClick={handleMove.bind(undefined, 6)}></div>
                    <div className="square" onClick={handleMove.bind(undefined, 7)}></div>
                    <div className="square" onClick={handleMove.bind(undefined, 8)}></div>
                </div>
            </div>
            <div>
                <button type="button" className="button" onClick={handleButtonClick}>Start game</button>
            </div>
        </div>
    );
}

export default App;
