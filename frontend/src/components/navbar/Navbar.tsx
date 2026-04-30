import Title from "./Title";
import Subtitle from "./Subtitle";
import LngButton from "./LngButton";
import ProfileButton from "./ProfileButton";
import MenuButton from "./MenuButton";

export default function Navbar() {

	return (
		<div>
			<MenuButton/>
			<Title />
			<Subtitle />
			<LngButton />
			<ProfileButton />
		</div>
	)
}
