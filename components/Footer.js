import Emoji from "a11y-react-emoji";

export default function Footer() {
    return (
        <footer className="flex items-center justify-center w-full pt-5 text-sm text-center">
            © 2021 {new Date().getFullYear() > 2021 ? "- 2021" : ""} by FS Dave
            Roverts <Emoji className="font-medium" symbol="✈️" />. All rights reserved.
        </footer>
    )
}