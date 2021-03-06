import React from 'react'

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='b f3'>
                <span id= 'camel-case'>{`${name}`}</span>, {`your total face-recognition count is:`}
            </div>
            <div className='b f2'>
                {entries}
            </div>
        </div>
    )
}

export default Rank;
