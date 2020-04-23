import React from 'react'
export const UserInfoDisplay = ({name,address1,country,phone,fetched})=>(
    <div>
        <section className="current-user">
            {fetched ?
            <p>
                {name}
                <br/>
                {address1}, {country}
                <br/>
                {phone}
                {console.info('render')}
            </p>
            : <div>
                <p>
                    Please wait while we fetch your user info.
                </p>
            </div>}
        </section>
    </div>
);