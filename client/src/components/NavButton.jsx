import { useLocation, Link } from "react-router-dom";

export const BackArrow = () => {
    return(
        <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.613 10.0862H5.83902L13.3775 2.60298L11.3637 0.603882L0.387024 11.5L11.3637 22.3961L13.3775 20.397L5.83902 12.9138H26.613V10.0862Z" fill="#A78BFA"/>
        </svg>
    );
}

export const ForwardArrow = () => {
    return(
    <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.386999 12.9138L21.161 12.9138L13.6225 20.397L15.6363 22.3961L26.613 11.5L15.6363 0.603901L13.6225 2.603L21.161 10.0862L0.386999 10.0862V12.9138Z" fill="#A78BFA"/>
    </svg>
    );
}

export function NavButton() {
    const {pathname} = useLocation();
    
    const [text, url, dir] = pathname === "/" ? ["go to model", "/model", "forward"] : pathname === "/model" ? ["home", "/", "back"] : null;

    return(
        <Link to={url}>
        <div className={`${dir==="back" ? "flex-row-reverse" : "flex"} flex justify-between my-4 px-4 py-2 border-2 border-solid rounded border-purple-400 md:hidden`}>
            <p className="uppercase text-base text-purple-400">{text}</p>
            { dir === "back" ? <BackArrow /> : dir === "forward" ? <ForwardArrow /> : null}
        </div>
        </Link>
    );
}