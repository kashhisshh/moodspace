/* eslint-disable react/prop-types */
import Navigation from "../Navigation/Navigation";

export const Layout = ({children}) => {
    return <div>
        <Navigation/>
        {children}
    </div>
}