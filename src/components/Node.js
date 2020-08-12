import React from 'react';
import "./node.css";

function Node({isSrc, isDst, isOther, weight, row, col}) {

    const myClass = isSrc ? "node-src" : isDst ? "node-dst" : isOther ? "node-other" : "";

    return (
        <div className={`node ${myClass}`} id={`node-${row}-${col}`}>
            <p className="weighted" id={`weightid`}>{weight}</p>
        </div>
    );
}

export default Node;