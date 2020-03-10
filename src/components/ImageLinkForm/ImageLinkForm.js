import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This application will detect faces in your pictures. Give it a try :)'}
            </p>
            <div className="center">
                <div className='form center pa4 br3 shadow-5'>
                    <input onChange={onInputChange} className='f4 pa2 w-70 center' placeholder='Enter the image url.' type='text' />
                    <button onClick={onPictureSubmit} className='w-30 br2 grow f4 b link ph3 pv2 white dib bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm