import LngButton from "./LngButton";
import ProfileButton from "./ProfileButton";
import MenuButton from "./MenuButton";

export default function Navbar() {

	return (
		<div className="w-full flex gap-4 items-center px-4 bg-orange-400 text-yellow-50">
			<MenuButton/>
			<div className="grow flex justify-end gap-4">
				<LngButton />
				<ProfileButton />
			</div>
		</div>
	)
}
