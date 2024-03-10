import { useRouteError } from "react-router";

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <p></p>
        </div>
    )
}