import React from "react";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return  (
        <div>
            <p className="f3 b">
                {'this magic Brain will detect your pictures'}
            </p>
            <p className="f3 b">
                {'Give it a try'}
            </p>
            <div className="parent ma5 pa4 br3 shadow-5">
                <input className="f4 pa2 w-70" type="text" onChange={onInputChange} />
                <button 
                className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                onClick={onButtonSubmit}>
                    Detect
                </button>
            </div>
        </div>
    )
}

export default ImageLinkForm