import React from 'react';


export default class TestDataLoadingPage extends React.Component
{

    render() {
        return <div>
            Testy <Link route="viewUser" params={{ id: 111 }}>Home</Link>
        </div>;
    }
}
