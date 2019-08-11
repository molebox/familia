import React from 'react';

const FirebaseContext = React.createContext(null);

// HOC to wrap any component with the firebase context
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase}/>}
    </FirebaseContext.Consumer>
)

export default FirebaseContext;
