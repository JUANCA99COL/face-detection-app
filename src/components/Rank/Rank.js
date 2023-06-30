import React from "react";

const Rank = ({ name, entries }) => {
    return  (
        <div>
            <div className="f3 b">
            {`${name}, your current entry count is...`}
            </div>
            <div className="f3 b">
            {entries}
            </div>
        </div>
    )
}

export default Rank